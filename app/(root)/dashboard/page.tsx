import StocksCard from '@/components/StocksCard';
import { getStocksDetails } from '@/lib/actions/finnhub.actions';
import { notFound } from 'next/navigation';

const Dashboard = async () => {
  const stockData = await getStocksDetails('AAPL');

  if (!stockData) return notFound();

  return (
    <section className='flex pt-18 container'>
      <StocksCard
        company={stockData.company}
        logo={stockData.logo!}
        symbol={stockData.symbol}
        price={stockData.price}
        changePercent={stockData.changePercent}
      />
    </section>
  );
};

export default Dashboard;
