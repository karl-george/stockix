'use client';

import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface WatchlistButtonProps {
  symbol: string;
  company: string;
  isWatched?: boolean;
}

const WatchlistButton = ({
  symbol,
  company,
  isWatched,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState(isWatched);

  const toggleWatchlist = async () => {
    if (added) {
      await removeFromWatchlist(symbol);
    } else {
      await addToWatchlist(symbol, company);
    }

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
      className='cursor-pointer'
    >
      <Star fill={added ? 'currentColor' : 'none'} />
    </button>
  );
};

export default WatchlistButton;
