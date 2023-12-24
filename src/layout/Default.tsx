// import Navbar from '@/components/layout-element/Navbar';
import Navbar from '@/components/layout-element/Default/Navbar';
import Sidebar from '@/components/layout-element/Default/Sidebar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
type Props = {
  //
};

const Default: FC<Props> = ({}) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 flex p-2">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Default;
