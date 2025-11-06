import Image from 'next/image';
import ChangePercentArrows from './ChangePercentArrows';
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
        <span className='text-xl'>{price}</span>
        <ChangePercentArrows changePercent={changePercent} />
      </div>
    </div>
  );
};

export default StocksCard;
