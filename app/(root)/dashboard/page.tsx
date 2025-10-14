import StocksCard from '@/components/StocksCard';
import TradingViewWidget from '@/components/TradingViewWidget';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { notFound } from 'next/navigation';

const Dashboard = async () => {
  const stockData = await getStocksDetails('AAPL');

  if (!stockData) return notFound();

  return (
    <section className='flex flex-col pt-18 min-h-screen'>
      {/* Carousel */}
      <Carousel className='mx-auto w-full'>
        <CarouselContent>
          <CarouselItem className='lg:basis-1/4 basis-3xs'>
            <StocksCard
              company={stockData.company}
              logo={stockData.logo!}
              symbol={stockData.symbol}
              price={stockData.price}
              changePercent={stockData.changePercent}
            />
          </CarouselItem>
          <CarouselItem className='lg:basis-1/4 basis-3xs'>
            <StocksCard
              company={stockData.company}
              logo={stockData.logo!}
              symbol={stockData.symbol}
              price={stockData.price}
              changePercent={stockData.changePercent}
            />
          </CarouselItem>
          <CarouselItem className='lg:basis-1/4 basis-3xs'>
            <StocksCard
              company={stockData.company}
              logo={stockData.logo!}
              symbol={stockData.symbol}
              price={stockData.price}
              changePercent={stockData.changePercent}
            />
          </CarouselItem>
          <CarouselItem className='lg:basis-1/4 basis-3xs'>
            <StocksCard
              company={stockData.company}
              logo={stockData.logo!}
              symbol={stockData.symbol}
              price={stockData.price}
              changePercent={stockData.changePercent}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Stock Chart */}
      <div className='mt-12 flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:flex-row w-full'>
          <div className='h-[700px] lg:w-3/4 '>
            <TradingViewWidget />
          </div>
          <div className='h-[500px] bg-[#1C1D21]'>Watchlist</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
