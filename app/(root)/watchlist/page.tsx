import Search from '@/components/Search';
import { WatchlistTable } from '@/components/WatchlistTable';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { getWatchlistData } from '@/lib/actions/watchlist.actions';
import { Star } from 'lucide-react';

const Page = async () => {
  const watchlist = await getWatchlistData();
  const defaultStocks = await searchStocks();

  // Watch list is empty
  if (watchlist.length === 0) {
    return (
      <section className='flex watchlist-empty-container'>
        <div className='watchlist-empty'>
          <Star className='watchlist-star' />
          <p className='empty-description'>
            Start building your watchlist by searching for stocks and clicking
            the star icon to add them
          </p>
        </div>
        <Search defaultStocks={defaultStocks} />
      </section>
    );
  }

  return (
    <section className='py-10'>
      <div className='flex flex-col gap-6'>
        <WatchlistTable watchlist={watchlist} />
      </div>
    </section>
  );
};

export default Page;
