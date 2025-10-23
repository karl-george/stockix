import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import WatchlistButton from './WatchlistButton';

const StocksCard = ({
  company,
  logo,
  symbol,
  price,
  changePercent,
  isWatched,
}: StockData) => {
  return (
    <div className='relative bg-gradient-to-br from-[#2d2d2d] to-[#16161a] text-white p-4 rounded-2xl shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.6)] cursor-pointer'>
      <div className='flex items-center'>
        <Image
          src={logo || '/logo.png'}
          alt={company}
          width={100}
          height={100}
          className='h-12 w-auto rounded-full'
        />
        <div>
          <div className='flex flex-col ml-4'>
            <span className='font-semibold'>{symbol}</span>
            <span className='text-sm text-[#79797a]'>{company}</span>
          </div>
        </div>
        <div className='ml-auto'>
          <WatchlistButton
            symbol={symbol}
            company={company}
            isWatched={isWatched}
          />
        </div>
      </div>
      {/* Price Change */}
      <div className='flex justify-center items-center mt-12 gap-2 flex-col'>
        <span className='text-xl'>${price}</span>
        <div className='flex items-center gap-1'>
          {changePercent?.toString().charAt(0) === '-' ? (
            <div className='flex items-center gap-1'>
              <ArrowDownRight className='w-4 h-4' fill='red' stroke='red' />
              <span className='text-red-500'>{changePercent?.toFixed(2)}%</span>
            </div>
          ) : (
            <div className='flex items-center gap-1'>
              <ArrowUpRight className='w-4 h-4' fill='green' stroke='green' />
              <span className='text-green-500'>
                {changePercent?.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksCard;
