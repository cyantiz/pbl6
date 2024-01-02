// import Navbar from '@/components/layout-element/Navbar';
import Footer from '@/components/layout-element/Default/Footer';
import Navbar from '@/components/layout-element/Default/Navbar';
import Sidebar from '@/components/layout-element/Default/Sidebar';
import TopContributors from '@/components/layout-element/Default/Sidebar/TopContributors';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
type Props = {
  //
};

const Default: FC<Props> = ({}) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto pt-6 flex gap-4 px-2">
        <div className="hidden lg:flex flex-col gap-6">
          <Sidebar />
          <TopContributors />
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Default;
