import { Role } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { Icon } from '@iconify/react';
import { Avatar, Button, Dropdown, Navbar as FBNavbar } from 'flowbite-react';
import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

type Props = PropsWithChildren<{}>;

const NAVBAR_LINKS = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Category',
    path: '/category-list',
  },
  {
    name: 'Trending News',
    path: '/posts/trending',
  },
  {
    name: 'Recent News',
    path: '/recent-news',
  },
];

const Navbar: FC<Props> = () => {
  const { pathname } = useLocation();

  const { authUser, clearAuthData } = useAuthStore(
    (store) => ({
      authUser: store.authUser,
      clearAuthData: store.clear,
    }),
    shallow,
  );

  const canCreatePost = useMemo(() => {
    return [Role.ADMIN, Role.EDITOR, Role.MODERATOR].includes(authUser.role);
  }, [authUser.role]);

  console.log(location);

  return (
    <FBNavbar fluid rounded>
      <FBNavbar.Brand href="#">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="LOGO" /> */}
        <div className="font-black text-4xl">Logo</div>
      </FBNavbar.Brand>
      <FBNavbar.Collapse>
        {NAVBAR_LINKS.map((link) => (
          <FBNavbar.Link as={Link} key={link.name} to={link.path} active={pathname === link.path}>
            {link.name}
          </FBNavbar.Link>
        ))}
      </FBNavbar.Collapse>
      <div className="flex md:order-2 gap-4  list-none">
        {canCreatePost && <CreatePostButton />}
        {authUser.id ? <ProfileDropdown /> : <LoginButton />}
        <FBNavbar.Toggle />
      </div>
    </FBNavbar>
  );
};

const LoginButton: FC = () => {
  return (
    <FBNavbar.Link as={Link} to="auth/login">
      Login
    </FBNavbar.Link>
  );
};

const CreatePostButton: FC = () => {
  return (
    <FBNavbar.Link as={Link} to="create-post">
      <Button>
        <Icon icon="ph:pen-nib" className="mr-2 h-4 w-4" />
        Create Post
      </Button>
    </FBNavbar.Link>
  );
};

const ProfileDropdown: FC = () => {
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

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="User settings" img={authUser.avatarUrl} rounded />}
    >
      <Dropdown.Header>
        <div className="flex flex-col gap-1">
          <span className="block text-sm font-medium">{authUser.name}</span>
          <span className="block text-xs">@{authUser.username}</span>
          <span className="block truncate text-sm font-medium">{authUser.email}</span>
        </div>
      </Dropdown.Header>
      <Dropdown.Item>Personal Information</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export default Navbar;
