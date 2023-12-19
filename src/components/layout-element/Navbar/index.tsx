import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
      <Layout>
        <Layout.Header className="nav-header bg-white border-0 px-3 py-0 flex">
          <div className="logo hidden md:block mr-4 float-left">
            <h3 className="brand-font">LOGO</h3>
          </div>
          <div className="navbar-menu h-full items-center flex flex-1">
            <div className=" hidden md:flex">
              <LeftMenu key="left-menu" mode={'horizontal'} />
            </div>
            <div className="search--big w-96 ml-12 items-center hidden md:flex">
              <Input.Search
                placeholder="Search..."
                size="large"
                onSearch={(value) => {
                  window.location.replace(`/posts/by-search?searchText=${value}`);
                }}
              />
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
              className="block md:hidden h-8 bg-transparent mr-2 justify-self-end ml-auto"
              type="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
            <div className="hidden md:flex flex-1 justify-end">
              <RightMenu key="right-menu" mode={'horizontal'} />
            </div>

            <Drawer
              title={'Logo'}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu key="drawer-left-menu" mode={'inline'} />
              <RightMenu key="drawer-right-menu" mode={'inline'} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
