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
    name: 'Trending News',
    path: '/posts/trending',
    icon: <StockOutlined />,
  },
  {
    name: 'Latest News',
    path: '/posts',
    icon: <FireOutlined />,
  },
];

type Props = Partial<MenuProps> & {};

const LeftMenu = ({ mode }: Props) => {
  return (
    <Menu mode={mode}>
      {NAVBAR_LINKS.map((link) => (
        <Menu.Item key={'left-menu' + link.path}>
          <Link to={link.path} className="flex gap-2 font-sans">
            {link.icon}
            {link.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default LeftMenu;
