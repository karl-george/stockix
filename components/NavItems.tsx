'use client';

import { NAV_LINKS } from '@/lib/contants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;

    return pathname.startsWith(path);
  };

  return (
    <div>
      <ul className='flex flex-col md:flex-row gap-2 md:gap-12 px-2'>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-blue-primary transition-colors ${
                isActive(href) ? 'text-blue-primary' : ''
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
