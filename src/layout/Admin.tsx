import AdminSidebar from '@/components/layout-element/Admin/Sidebar';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {
  //
};

const AdminLayout: FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex">
      <div className="h-full flex flex-col bg-white">
        <AdminSidebar />
        <Button
          className="mt-auto mb-8 mx-2"
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <ArrowLeftOutlined />
          Back to homepage
        </Button>
      </div>
      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
