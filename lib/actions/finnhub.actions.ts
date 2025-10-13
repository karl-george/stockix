'use server';

import { cache } from 'react';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const NEXT_PUBLIC_FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

if (!NEXT_PUBLIC_FINNHUB_API_KEY) {
  throw new Error('FINNHUB_API_KEY is not defined');
}

async function fetchJSON<T>(
  url: string,
  revalidateSeconds?: number
): Promise<T> {
  const options: RequestInit & { next?: { revalidate?: number } } =
    revalidateSeconds
      ? { cache: 'force-cache', next: { revalidate: revalidateSeconds } }
      : { cache: 'no-store' };

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export { fetchJSON };

export const getStocksDetails = cache(async (symbol: string) => {
  const cleanedSymbol = symbol.trim().toUpperCase();

  try {
    const [quote, profile, financials] = await Promise.all([
      fetchJSON(
        // Price data - no caching
        `${FINNHUB_BASE_URL}/quote?symbol=${cleanedSymbol}&token=${NEXT_PUBLIC_FINNHUB_API_KEY}`
      ),
      fetchJSON(
        // Profile data - no caching
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${cleanedSymbol}&token=${NEXT_PUBLIC_FINNHUB_API_KEY}`
      ),
      fetchJSON(
        // Financial data - no caching
        `${FINNHUB_BASE_URL}/stock/metric/?symbol=${cleanedSymbol}&metric=all&token=${NEXT_PUBLIC_FINNHUB_API_KEY}`
      ),
    ]);

    // Type cast for safety
    const quoteData = quote as Quote;
    const profileData = profile as Profile;
    const financialsData = financials as Financials;

    if (!quoteData?.c || !profileData?.name)
      throw new Error('Invalid quote or profile data');

    const changePercent = quoteData.dp || 0;
    const peRatio = financialsData?.metric?.peNormalizedAnnual || null;

    return {
      symbol: cleanedSymbol,
      company: profileData.name,
      price: quoteData.c,
      peRatio: peRatio?.toFixed(2),
      changePercent,
      marketCap: profileData?.marketCapitalization || 0,
      logo: profileData?.logo,
    };
  } catch (error) {
    console.log(error);
  }
});
