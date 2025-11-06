import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect('/');

  return (
    <main className='px-8'>
      <div className='border border-gray-500 bg-gray-bg flex flex-col w-full mx-auto mt-24 rounded-md py-8 px-4 lg:w-[600px]'>
        {children}
      </div>
    </main>
  );
};

export default Layout;
