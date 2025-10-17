import { useDebounce } from '@/hooks/useDebounce';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';
import { Star } from 'lucide-react';
import { useState } from 'react';

const WatchlistButton = ({
  symbol,
  company,
}: {
  symbol: string;
  company: string;
}) => {
  const [added, setAdded] = useState(false);

  const toggleWatchlist = async () => {
    const result = added
      ? await removeFromWatchlist(symbol)
      : await addToWatchlist(symbol, company);

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
