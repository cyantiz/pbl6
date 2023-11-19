import { useAuthStore } from '@/store';
import { Avatar, Dropdown, Navbar as FBNavbar } from 'flowbite-react';
import { FC, PropsWithChildren } from 'react';
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
    path: '/trending-news',
  },
  {
    name: 'Recent News',
    path: '/recent-news',
  },
  {
    name: 'Clubs Ranking',
    path: '/clubs-ranking',
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

  const handleSignOut = () => {
    clearAuthData();
    location.replace('/auth/login');
  };

  console.log(location);

  return (
    <FBNavbar fluid rounded>
      <FBNavbar.Brand href="#">
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="LOGO" /> */}
        <div className="font-black text-4xl">Logo</div>
      </FBNavbar.Brand>
      <div className="flex md:order-2 gap-4 md:gap-0 list-none">
        {authUser.id ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
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
        ) : (
          <FBNavbar.Link as={Link} to="auth/login">
            Login
          </FBNavbar.Link>
        )}
        <FBNavbar.Toggle />
      </div>
      <FBNavbar.Collapse>
        {NAVBAR_LINKS.map((link) => (
          <FBNavbar.Link as={Link} key={link.name} to={link.path} active={pathname === link.path}>
            {link.name}
          </FBNavbar.Link>
        ))}
      </FBNavbar.Collapse>
    </FBNavbar>
  );
};

export default Navbar;
