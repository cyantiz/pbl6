import { useAuthStore } from '@/store';
import { BookOutlined, CodeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Role } from '@api/auth.api';
import { Avatar, Menu, MenuProps } from 'antd';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

type Props = Partial<MenuProps> & {};
const RightMenu = ({ mode }: Props) => {
  const { authUser, clearAuthData } = useAuthStore(
    (store) => ({
      authUser: store.authUser,
      clearAuthData: store.clear,
    }),
    shallow,
  );

  const handleSignOut = useCallback(() => {
    clearAuthData();
    location.replace('/auth/login');
  }, [clearAuthData]);

  console.log('authUser', authUser);
  return (
    <Menu mode={mode}>
      {authUser.id && (
        <Menu.SubMenu
          key={'right-menu-user'}
          title={
            <>
              <Avatar src={authUser.avatarUrl} />
              <span className="username">{authUser.username}</span>
            </>
          }
        >
          {authUser.role === Role.EDITOR && (
            <>
              <Menu.Item key={'/posts/mine' + '-right-menu'}>
                <Link to="/posts/mine">
                  <CodeOutlined /> My Posts
                </Link>
              </Menu.Item>
              <Menu.Item key={'create-posts' + '-right-menu'}>
                <Link to="/create-post">
                  <CodeOutlined /> Create post
                </Link>
              </Menu.Item>
            </>
          )}
          {authUser.role === Role.ADMIN && (
            <>
              <Menu.Item key={'/admin' + '-right-menu'}>
                <Link to="/admin">
                  <CodeOutlined /> Admin
                </Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key={'profile' + '-right-menu'}>
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item key={'recent-reads' + '-right-menu'}>
            <BookOutlined /> Recent reads
          </Menu.Item>
          <Menu.Item key={'log-out' + '-right-menu'} onClick={handleSignOut}>
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      )}
      {!authUser.id && (
        <div className="pt-8 md:p-0">
          <Link to="/auth/login" className="md:mt-0 md:mr-4 flex gap-2">
            <UserOutlined className="text-base" />
            Login
          </Link>
        </div>
      )}
    </Menu>
  );
};

export default RightMenu;