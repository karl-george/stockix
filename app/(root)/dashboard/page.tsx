'use client';

import StocksCarousel from '@/components/StocksCarousel';
import TradingViewWidget from '@/components/TradingViewWidget';
import { setWidgetConfig } from '@/lib/utils';
import { useState } from 'react';

const Dashboard = () => {
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <section className='flex flex-col py-10 min-h-screen'>
      <StocksCarousel setSymbol={setSymbol} />

      {/* Stock Chart */}
      <div className='mt-12 flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:flex-row w-full gap-10 lg:gap-4 '>
          <div className='h-[850px] lg:w-3/4 '>
            <TradingViewWidget
              scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
              config={setWidgetConfig(symbol)}
              height={850}
            />
          </div>
          <div className='h-[850px] bg-[#1C1D21] rounded-lg lg:w-1/4'>
            Watchlist
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
