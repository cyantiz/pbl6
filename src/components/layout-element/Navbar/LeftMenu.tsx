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

type Props = Partial<MenuProps> & {
  key: string;
};

const LeftMenu = ({ mode, key }: Props) => {
  return (
    <Menu key={key} mode={mode}>
      {NAVBAR_LINKS.map((link) => (
        <Menu.Item key={link.path + key}>
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
