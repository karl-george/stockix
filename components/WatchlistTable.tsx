'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import WatchlistButton from './WatchlistButton';
import { changePercentColor, cn } from '@/lib/utils';
import Image from 'next/image';

export function WatchlistTable({ watchlist }: { watchlist: StockData[] }) {
  const router = useRouter();

  return (
    <>
      <Table className='hide-scrollbar overflow-hidden w-full relative rounded-lg !border-gray-600 border'>
        <TableHeader>
          <TableRow className='text-gray-400 font-medium border-b border-gray-600 hover:border-gray-700'>
            {WATCHLIST_TABLE_HEADER.map((label) => (
              <TableHead key={label}>{label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((item, index) => (
            <TableRow
              key={item.symbol + index}
              className='border-b cursor-pointer border-gray-600 hover:border-gray-700/40 transition-colors'
              onClick={() =>
                router.push(`/stocks/${encodeURIComponent(item.symbol)}`)
              }
            >
              <TableCell className='pl-4 font-medium text-base'>
                <div className='flex items-center gap-2'>
                  <Image
                    src={item.logo || '/logo.png'}
                    alt={item.company}
                    width={50}
                    height={50}
                    className='h-5 w-auto rounded-full'
                  />
                  {item.company}
                </div>
              </TableCell>
              <TableCell className='font-medium text-base'>
                {item.symbol}
              </TableCell>
              <TableCell className='font-medium text-base'>
                {item.priceFormatted || '—'}
              </TableCell>
              <TableCell
                className={cn(
                  'font-medium text-base',
                  changePercentColor(item.changePercent)
                )}
              >
                {item.changePercentFormatted || '—'}
              </TableCell>
              <TableCell className='font-medium text-base'>
                {item.marketCap || '—'}
              </TableCell>
              <TableCell className='font-medium text-base'>
                {item.peRatio || '—'}
              </TableCell>
              <TableCell>
                <WatchlistButton
                  symbol={item.symbol}
                  company={item.company}
                  isWatched={true}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
