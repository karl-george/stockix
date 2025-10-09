import Image from 'next/image';
import Link from 'next/link';
import Dropdown from './Dropdown';
import NavItems from './NavItems';
import Search from './Search';

const Header = () => {
  const isSignedIn = false;

  return (
    <header className='sticky top-0 z-50 w-full border-b border-gray-primary'>
      <div className='container flex items-center justify-between py-8'>
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
        <Search />
        {isSignedIn ? (
          <Dropdown />
        ) : (
          <div className='flex items-center gap-4'>
            <p>Login</p>
            <p>Sign Up</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
