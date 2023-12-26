import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './index.less';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav className="navbar">
      <Layout className="!bg-white">
        <Layout.Header className="nav-header bg-white border-0 px-3 py-0 flex">
          <Link to="/" className="logo hidden md:block mr-4 float-left !text-black">
            <h3 className="brand-font font-playfair">Sportivefy</h3>
          </Link>
          <div className="navbar-menu h-full items-center flex-1 flex">
            <div className="search--big flex-1 hidden md:flex justify-center">
              <div className="w-[540px] ml-4 mr-2 font-sans items-center flex">
                <Input.Search
                  size="large"
                  placeholder="Search..."
                  // size=""
                  onSearch={(value) => {
                    window.location.replace(`/posts/by-search?searchText=${value}`);
                  }}
                />
              </div>
            </div>
            <div className="search--small w-72 items-center flex md:hidden">
              <Input.Search
                placeholder="Search..."
                size="middle"
                onSearch={(value) => {
                  window.location.replace(`/posts/by-search?searchText=${value}`);
                }}
              />
            </div>
            <Button
              className="block lg:!hidden h-8 bg-transparent mr-2 justify-self-end ml-auto"
              type="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
            <div className="hidden lg:flex justify-end">
              <RightMenu key="right-menu" mode={'horizontal'} />
            </div>

            <Drawer
              title={'Sportivefy'}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={'inline'} />
              <br />
              <RightMenu mode={'inline'} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
