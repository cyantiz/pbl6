import { BookOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItemWithChildren {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItemWithChildren;
}

type MenuItemWithChildren = MenuItem & { children?: MenuItem[] };

const items: Array<MenuItemWithChildren> = [
  getItem('Accounts', '/admin/accounts', <UserOutlined />, [
    getItem('Users', '/admin/accounts/users'),
    getItem('Editors', '/admin/accounts/editors'),
    getItem('Graph', '/admin/accounts/graph'),
  ]),
  getItem('Posts', '/admin/posts', <BookOutlined />, [getItem('List', '/admin/posts/list')]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const AdminSidebar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [selectedKeys, setSelectedKeys] = useState(['/account-mgt/users']);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    const found = items.find((item) => item?.children?.find((child) => child?.key === path));
    if (found) {
      setOpenKeys([found?.key?.toString() ?? 'sub1']);
      setSelectedKeys([path]);
    }
  }, []);

  const onSelect: MenuProps['onSelect'] = ({ selectedKeys }) => {
    setSelectedKeys(selectedKeys);

    navigate(selectedKeys[0]);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      style={{ width: 256 }}
      items={items}
    ></Menu>
  );
};

export default AdminSidebar;
