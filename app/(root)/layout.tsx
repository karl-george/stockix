import Header from '@/components/Header';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen overflow-y-auto hide-scrollbar'>
      {/* <Header /> */}
      <div className='container'>{children}</div>
    </div>
  );
};

export default Layout;
