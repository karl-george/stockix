'use server';

import { cache } from 'react';
import { POPULAR_STOCK_SYMBOLS } from '../contants';
import { getWatchlistByEmail } from './watchlist.actions';
import { auth } from '../better-auth/auth';
import { headers } from 'next/headers';

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

export const searchStocks = cache(
  async (searchTerm?: string): Promise<StockWatchlist[]> => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });

      const userWatchlist = await getWatchlistByEmail(
        session?.user.email || ''
      );

      const token = NEXT_PUBLIC_FINNHUB_API_KEY;

      if (!token) {
        console.error(
          'Error searching',
          new Error('FINNHUB_API_KEY is not defined')
        );
        return [];
      }

      const cleaned = typeof searchTerm === 'string' ? searchTerm.trim() : '';

      let results: FinnhubResult[] = [];

      if (!cleaned) {
        const top10 = POPULAR_STOCK_SYMBOLS.slice(0, 10);
        const profiles = await Promise.all(
          top10.map(async (sym) => {
            try {
              const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(
                sym
              )}&token=${token}`;

              // Refresh every hour
              const profile = await fetchJSON(url, 3600);

              return { sym, profile };
            } catch (error) {
              console.error(
                'Error fecthing profile during search for',
                sym,
                error
              );
              return { sym, profile: null };
            }
          })
        );

        results = profiles
          .map(({ sym, profile }) => {
            const symbol = sym.toUpperCase();
            const name: string | undefined =
              profile?.name || profile?.ticker || undefined;
            const exchange: string | undefined = profile?.exchange || undefined;

            if (!name) return undefined;

            const res: FinnhubResult = {
              symbol,
              description: name,
              displaySymbol: symbol,
              type: 'Common Stock',
            };

            (res as any).__exchange = exchange;

            return res;
          })
          .filter((x) => Boolean(x));
      } else {
        const url = `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(
          cleaned
        )}&token=${token}`;
        const data = await fetchJSON(url, 1800);
        results = Array.isArray(data?.result) ? data.result : [];
      }

      const mapped = results
        .map((r) => {
          const upper = (r.symbol || '').toUpperCase();
          const name = r.description || upper;
          const exchangeDisplay =
            (r.displaySymbol as string | undefined) || undefined;
          const exchangeProfile = (r as any).__exchange as string | undefined;
          const exchange = exchangeDisplay || exchangeProfile || 'US';
          const type = r.type || 'Stock';
          const item = {
            symbol: upper,
            name,
            exchange,
            type,
            // !Todo
            isWatched: userWatchlist.includes(r.symbol.toUpperCase()),
          };
          return item;
        })
        .slice(0, 15);

      return mapped;
    } catch (err) {
      console.error('Error searching', err);
      return [];
    }
  }
);
