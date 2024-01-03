import { AppstoreOutlined, FireOutlined, HomeOutlined, StockOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
const NAVBAR_LINKS = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeOutlined />,
  },
  {
    name: 'Category',
    path: '/category-list',
    icon: <AppstoreOutlined />,
  },
  {
    name: 'Hot News',
    path: '/posts/hot-news',
    icon: <FireOutlined />,
  },
  {
    name: 'Latest News',
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
