import { ArrowDown, ArrowUp, Star } from 'lucide-react';
import Image from 'next/image';

const StocksCard = ({ company, logo, symbol, price, changePercent }: Stock) => {
  return (
    <div className='flex flex-col bg-gray-bg p-4 rounded-lg w-72'>
      <div className='flex items-center justify-between'>
        <Image
          src={logo}
          alt={company}
          width={100}
          height={100}
          className='h-12 w-auto rounded-full'
        />
        <div>
          <div className='flex flex-col ml-4'>
            <span className='font-semibold'>{symbol}</span>
            <span className='text-sm'>{company}</span>
          </div>
        </div>
        <div>
          <Star className='w-5 h-5' />
        </div>
      </div>
      <div className='flex mt-6 text-center justify-center gap-4 items-center'>
        <span className='text-xl'>${price}</span>
        <div className='flex items-center gap-1'>
          {changePercent.toString().charAt(0) === '-' ? (
            <div className='flex items-center gap-1'>
              <ArrowDown className='w-4 h-4' fill='red' stroke='red' />
              <span className='text-red-500'>{changePercent.toFixed(2)}%</span>
            </div>
          ) : (
            <div className='flex items-center gap-1'>
              <ArrowUp className='w-4 h-4' fill='green' stroke='green' />
              <span className='text-green-500'>
                {changePercent.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksCard;
