'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from './ui/command';
import WatchlistButton from './WatchlistButton';
import { searchStocks } from '@/lib/actions/finnhub.actions';

type SearchProps = {
  defaultStocks: StockWatchlist[];
};

const Search = ({ defaultStocks }: SearchProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [stocks, setStocks] = useState<Stock[]>(defaultStocks);

  const isSearching = !!searchTerm.trim();
  const displayStocks = isSearching ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm('');
    setStocks(defaultStocks);
  };

  const handleSearch = async () => {
    if (!searchTerm) return setStocks(defaultStocks);

    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      setStocks(results);
    } catch (error) {
      console.error('Error handling search', error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 400);

  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  return (
    <>
      <div
        className='bg-[#2d2d2d] rounded-2xl py-2 flex gap-2 items-center px-6 cursor-pointer'
        onClick={() => setOpen(true)}
      >
        <span>Search</span>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className='bg-[#2d2d2d] lg:min-w-[600px] fixed top-80 left-1/2  z-50'
      >
        <div className='bg-black-bg border-b border-gray-600 relative'>
          <CommandInput
            placeholder='Search stocks'
            value={searchTerm}
            onValueChange={setSearchTerm}
            className='bg-black-bg border-0 text-white placeholder:text-gray-400 focus:ring-0 text-base h-14'
          />
          {loading && (
            <Loader2 className='absolute right-1/2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 animate-spin' />
          )}
        </div>
        <CommandList className='bg-black-bg max-h-[400px]'>
          {loading ? (
            <CommandEmpty className='py-6 text-center text-gray-400'>
              Loading Stocks...
            </CommandEmpty>
          ) : displayStocks?.length === 0 ? (
            <div className='px-5 py-2'>
              {isSearching ? 'No results found' : 'No stocks found'}
            </div>
          ) : (
            <ul>
              {displayStocks?.map((stock) => (
                <li
                  key={stock.symbol}
                  className='rounded-none my-3 px-2 w-full data-[selected=true]:bg-gray-600'
                >
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    onClick={handleSelectStock}
                    className='px-2 w-full cursor-pointer border-b border-gray-600 last:border-b-0 flex items-center gap-3'
                  >
                    <div className='flex-1'>
                      <div className='search-item-name'>{stock.name}</div>
                      <div className='text-sm text-gray-500'>
                        {stock.symbol} | {stock.exchange} | {stock.type}
                      </div>
                    </div>
                    <WatchlistButton
                      symbol={stock.symbol}
                      company={stock.name}
                      isWatched={stock.isWatched}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
