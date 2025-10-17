import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface WatchlistStock extends Document {
  userId: string;
  symbol: string;
  company: string;
  addedAt: Date;
}

const watchlistSchema = new Schema<WatchlistStock>(
  {
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    company: { type: String, required: true, trim: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Prevent duplicate symbols
watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export const Watchlist: Model<WatchlistStock> =
  (models?.Watchlist as Model<WatchlistStock>) ||
  model('Watchlist', watchlistSchema);
