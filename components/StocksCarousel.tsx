'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { useEffect, useState } from 'react';
import StocksCard from './StocksCard';

const POP_STOCKS = ['AAPL', 'NVDA', 'MSFT', 'GOOGL'];

const StocksCarousel = ({
  setSymbol,
}: {
  setSymbol: (symbol: string) => void;
}) => {
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const allStocks = await Promise.all(
        POP_STOCKS.map((symbol) => getStocksDetails(symbol))
      );
      setStockData(allStocks as StockData[]);
    };
    fetchStocks();
  }, []);

  return (
    <Carousel className='mx-auto w-full'>
      <CarouselContent>
        {stockData?.map((stock) => (
          <CarouselItem
            key={stock?.symbol}
            className='lg:basis-1/4 basis-3xs'
            onClick={() => setSymbol(stock?.symbol)}
          >
            <StocksCard
              company={stock?.company}
              logo={stock?.logo}
              symbol={stock?.symbol}
              price={stock?.price}
              changePercent={stock?.changePercent}
              isWatched={stock?.isWatched}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default StocksCarousel;
