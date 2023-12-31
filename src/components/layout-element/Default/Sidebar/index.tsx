import { AppstoreOutlined, FireOutlined, HomeOutlined, HourglassOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type SidebarProps = {
  // Define your props here if needed
};

const sidebarItems = [
  {
    id: '/',
    icon: <HomeOutlined />,
    title: 'Trang chủ',
  },
  {
    id: '/posts',
    icon: <HourglassOutlined />,
    title: 'Tin gần đây',
  },
  {
    id: '/posts/hot-news',
    icon: <FireOutlined />,
    title: 'Tin hot!',
  },
  {
    id: '/category-list',
    icon: <AppstoreOutlined />,
    title: 'Chuyên mục',
  },
];

const Sidebar: FC<SidebarProps> = ({}) => {
  const { pathname: activeItem } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className="px-4 py-3 w-64 text-gray-500 font-medium duration-200 cursor-pointer rounded-l-md border-l-0 border-t-0 border-b-0 border-r-4 border-solid border-transparent flex items-center justify-start gap-4 hover:text-black hover:bg-gray-300 hover:border-black hover:fill-black"
          onClick={() => {
            navigate(item.id);
          }}
          style={
            activeItem === item.id
              ? {
                  backgroundColor: 'rgb(209 213 219 / 1)',
                  color: 'black',
                  borderColor: 'black',
                }
              : {}
          }
        >
          {item.icon}
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
