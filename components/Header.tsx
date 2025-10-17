import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './Dropdown';
import NavItems from './NavItems';
import Search from './Search';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { searchStocks } from '@/lib/actions/finnhub.actions';

const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const defaultStocks = await searchStocks();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-primary bg-black-bg'>
      <div className='container flex items-center justify-between py-8'>
        <div className='flex items-center lg:gap-32 md:gap-16'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Stockix logo'
              width={140}
              height={32}
              className='h-8 w-auto cursor-pointer'
            />
          </Link>
          <nav className='hidden md:block'>
            <NavItems />
          </nav>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Search defaultStocks={defaultStocks} />
          <div className='h-[24px] text-white bg-white w-[1px] opacity-50' />
          {session?.user.id ? (
            <Dropdown name={session.user.name} email={session.user.email} />
          ) : (
            <div className='flex items-center gap-4'>
              <Link
                href='/sign-in'
                className='hover:text-blue-primary transition-colors'
              >
                <p>Login</p>
              </Link>
              <Link
                href='/sign-up'
                className='hover:text-blue-primary transition-colors'
              >
                <p>Sign Up</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
