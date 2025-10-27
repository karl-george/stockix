import TradingViewWidget from '@/components/TradingViewWidget';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { getUserWatchlist } from '@/lib/actions/watchlist.actions';
import {
  setAdvancedWidget,
  setDetailsWidget,
  setFinancialsWidget,
  setProfileWidget,
  setTechAnalysisWidget,
  setWidgetConfig,
} from '@/lib/utils';
import { notFound } from 'next/navigation';

const StockDetails = async ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const { symbol } = await params;
  const stock = await getStocksDetails(symbol);
  const watchlist = await getUserWatchlist();

  const isWatched = watchlist?.some(
    (item) => item.symbol === symbol.toUpperCase()
  );

  if (!stock) notFound();

  return (
    <div className='flex min-h-screen py-10'>
      <section className='grid grid-cols-1 lg:grid-cols-3  gap-8 w-full'>
        {/* Left */}
        <div className='flex flex-col gap-5 lg:col-span-2'>
          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
            config={setDetailsWidget(symbol)}
            height={250}
          />

          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
            config={setWidgetConfig(symbol)}
            height={600}
          />

          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
            config={setAdvancedWidget(symbol)}
            height={600}
          />
        </div>

        {/* Right */}
        <div className='flex flex-col gap-5 lg:col-span-1'>
          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-financials.js'
            config={setFinancialsWidget(symbol)}
            height={650}
          />
          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
            config={setTechAnalysisWidget(symbol)}
            height={400}
          />

          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js'
            config={setProfileWidget(symbol)}
            height={400}
          />
        </div>
      </section>
    </div>
  );
};

export default StockDetails;
