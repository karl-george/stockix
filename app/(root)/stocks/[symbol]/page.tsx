import TradingViewWidget from '@/components/TradingViewWidget';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { getUserWatchlist } from '@/lib/actions/watchlist.actions';
import { setDetailsWidget, setWidgetConfig } from '@/lib/utils';
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
    <div className='flex min-h-screen pt-10'>
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full'>
        {/* Left */}
        <div className='flex flex-col gap-5'>
          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
            config={setDetailsWidget(symbol)}
            height={260}
          />

          <TradingViewWidget
            scriptUrl='https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
            config={setWidgetConfig(symbol)}
            height={850}
          />
        </div>

        {/* Right */}
        <div className='flex flex-col gap-5'></div>
      </section>
    </div>
  );
};

export default StockDetails;
