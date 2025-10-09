import { NAV_LINKS } from '@/lib/contants';

const NavItems = () => {
  return (
    <div>
      <ul className='flex items-center gap-12'>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavItems;
