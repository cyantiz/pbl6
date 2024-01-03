import { AppstoreOutlined, FireOutlined, HomeOutlined, StockOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
const NAVBAR_LINKS = [
  {
    name: 'Trang chủ',
    path: '/',
    icon: <HomeOutlined />,
  },
  {
    name: 'Chuyên mục',
    path: '/category-list',
    icon: <AppstoreOutlined />,
  },
  {
    name: 'Tin hot!',
    path: '/posts/hot-news',
    icon: <FireOutlined />,
  },
  {
    name: 'Tin gần đây',
    path: '/posts',
    icon: <StockOutlined />,
  },
];

type Props = Partial<MenuProps> & {};

const LeftMenu = ({ mode }: Props) => {
  return (
    <Menu mode={mode}>
      {NAVBAR_LINKS.map((link) => (
        <Menu.Item key={link.path}>
          <Link to={link.path} className="flex gap-2">
            {link.icon}
            {link.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default LeftMenu;
