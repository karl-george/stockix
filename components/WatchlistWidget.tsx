import { getWatchlistData } from '@/lib/actions/watchlist.actions';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ChangePercentArrows from './ChangePercentArrows';
import WatchlistButton from './WatchlistButton';

const WatchlistWidget = () => {
  const [watchlistData, setWatchlistData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const watchlist = await getWatchlistData();
      setWatchlistData(watchlist);
    };
    fetchWatchlist();
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold'>My Watchlist</h2>

      {watchlistData.length === 0 ? (
        <p className='text-sm text-[#79797a] mt-2'>Your watchlist is empty</p>
      ) : (
        watchlistData?.map((item, index) => (
          <div
            key={index}
            className='flex flex-row items-center justify-between border-b border-gray-primary/20 gap-4 py-4 last:border-0 lg:last:border-b-1'
          >
            <div className='flex items-center gap-2 max-w-[170px] w-full'>
              <Image
                src={item.logo || '/logo.png'}
                alt={item.company}
                width={50}
                height={50}
                className='h-10 w-auto rounded-full'
              />

              <div className='flex flex-col'>
                <span className='font-semibold'>{item.symbol}</span>
                <span className='text-sm text-[#79797a]'>{item.company}</span>
              </div>
            </div>

            <div>
              <ChangePercentArrows changePercent={item.changePercent} />
            </div>

            <div>
              <WatchlistButton
                symbol={item.symbol.toUpperCase()}
                company={item.company}
                isWatched
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WatchlistWidget;
