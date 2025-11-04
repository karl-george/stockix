import TradingViewWidget from '@/components/TradingViewWidget';
import {
  GAINERS_CONFIG,
  HEATMAP_CONFIG,
  MARKET_DATA_CONFIG,
  NEWS_DATA_CONFIG,
} from '@/lib/constants';

const Market = () => {
  return (
    <section className='flex flex-col pb-4 pt-10'>
      <div>
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className='lg:w-4/6'>
            <TradingViewWidget
              scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
              config={MARKET_DATA_CONFIG}
              height={565}
            />
          </div>
          <div className='lg:w-2/6'>
            <TradingViewWidget
              scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
              config={NEWS_DATA_CONFIG}
              height={565}
            />
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-4 lg:mt-8 mt-4'>
          <div className='lg:w-4/6'>
            <TradingViewWidget
              scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js'
              config={HEATMAP_CONFIG}
              height={565}
            />
          </div>
          <div className='lg:w-2/6'>
            <TradingViewWidget
              scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js'
              config={GAINERS_CONFIG}
              height={565}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;
