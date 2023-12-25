import { Result } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export type AdminAccountGraphPageProps = {
  // Define your props here if needed
};

const AdminAccountGraphPage: FC<AdminAccountGraphPageProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Result
        status="404"
        title="In development"
        subTitle="Sorry, the page you visited is in development"
      />
    </div>
  );
};

export default AdminAccountGraphPage;
