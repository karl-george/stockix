'use server';

import { Watchlist } from '@/database/models/watchlist.model';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { auth } from '../better-auth/auth';
import { connectToDatabase } from '@/database/mongoose';
import { getStocksDetails } from './finnhub.actions';

export const addToWatchlist = async (symbol: string, company: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user)
      return { success: false, error: 'Log in to add to watchlist' };

    // Check for stock already in watchlist
    const existingItem = await Watchlist.findOne({
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
    });

    if (existingItem) return { success: false, error: 'Already in watchlist' };

    // If no duplicate found, add to watchlist
    const newItem = new Watchlist({
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
      company: company.trim(),
    });

    await newItem.save();
    revalidatePath('/watchlist');

    return { success: true, message: 'Stock added to watchlist' };
  } catch (error) {
    console.error('Error adding to watchlist', error);
    throw new Error('Failed to add stock to watchlist');
  }
};

export const removeFromWatchlist = async (symbol: string) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user)
      return { success: false, error: 'Log in to remove from watchlist' };

    await Watchlist.deleteOne({
      userId: session.user.id,
      symbol: symbol.toUpperCase(),
    });

    revalidatePath('/watchlist');

    return { success: true, message: 'Stock removed from watchlist' };
  } catch (error) {
    console.error('Error removing from watchlist', error);
    throw new Error('Failed to remove stock from watchlist');
  }
};

export const getWatchlistByEmail = async (email: string): Promise<string[]> => {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose?.connection?.db;

    if (!db) throw new Error('Database not connected');

    const user = await db
      .collection('user')
      .findOne<{ _id: string; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user.id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((item) => String(item.symbol));
  } catch (error) {
    console.error('Error getting watchlist by email', error);
    return [];
  }
};

export const getUserWatchlist = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user)
      return { success: false, error: 'Log in to get watchlist' };

    const watchlist = await Watchlist.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(watchlist));
  } catch (error) {
    console.error('Error getting watchlist', error);
    throw new Error('Failed to get watchlist');
  }
};

export const getWatchlistData = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user)
      return { success: false, error: 'Log in to get watchlist' };

    const watchlist = await Watchlist.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    if (watchlist.length === 0) return [];

    const stocksWithData = await Promise.all(
      watchlist.map(async (item) => {
        const stockData = await getStocksDetails(item.symbol);

        if (!stockData) {
          console.error(`Error getting stock for ${item.symbol}`);
          return item;
        }

        return {
          company: stockData.company,
          symbol: item.symbol,
          logo: stockData.logo,
          price: stockData.currentPrice,
          changePercent: stockData.changePercent,
          marketCap: stockData.marketCap,
          peRatio: stockData.peRatio,
        };
      })
    );

    return JSON.parse(JSON.stringify(stocksWithData));
  } catch (error) {
    console.error('Error getting watchlist', error);
    throw new Error('Failed to get watchlist data');
  }
};
