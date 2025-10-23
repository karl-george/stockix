'use client';

import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Star } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const WatchlistButton = ({
  symbol,
  company,
}: {
  symbol: string;
  company: string;
}) => {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleWatchlist = async () => {
    const result = added
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

    if (result.success === false) redirect('/sign-in');

    // !Todo Add a toast
  };

  const debouncedToggle = useDebounce(toggleWatchlist, 400);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent event bubbling and default behavior
    e.stopPropagation();
    e.preventDefault();

    setAdded(!added);
    debouncedToggle();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={added ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <Star className='w-5 h-5' fill={added ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WatchlistButton;
