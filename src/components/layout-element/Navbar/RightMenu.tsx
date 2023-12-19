import { Role } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { BookOutlined, CodeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, MenuProps } from 'antd';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

type Props = Partial<MenuProps> & {
  key: string;
};
const RightMenu = ({ mode, key }: Props) => {
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
    <Menu mode={mode} key={key}>
      {authUser.id && (
        <Menu.SubMenu
          key={'user' + key}
          title={
            <>
              <Avatar src={authUser.avatarUrl} />
              <span className="username">{authUser.username}</span>
            </>
          }
        >
          {authUser.role === Role.EDITOR && (
            <>
              <Menu.Item key={'/posts/mine' + key}>
                <Link to="/posts/mine">
                  <CodeOutlined /> My Posts
                </Link>
              </Menu.Item>
              <Menu.Item key={'create-posts' + key}>
                <Link to="/create-post">
                  <CodeOutlined /> Create post
                </Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key={'profile' + key}>
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item key={'recent-reads' + key}>
            <BookOutlined /> Recent reads
          </Menu.Item>
          <Menu.Item key={'log-out' + key} onClick={handleSignOut}>
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
