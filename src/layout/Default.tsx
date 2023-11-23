import Navbar from '@/components/layout-element/Navbar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  //
};

const Default: FC<Props> = ({}) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6">
        <Outlet />
      </div>
    </>
  );
};

export default Default;
