import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Axios from "../utils/axios";

const { Header } = Layout;

const Navbar = () => {
  const { http, setToken, token } = Axios();
  console.log("token",token);
  const colorBgContainer = '#ffffff';
  const router = useRouter();
  const [collapsed , setCollapsed] = useState(false);

  const onLogout = async () => {
    localStorage.clear();
    await router.replace("/");
    await router.reload();
  }

  const navigateTo = (path) => {
    router.push(path);
  };

  // State to keep track of the screen width
  const [isMobileView, setIsMobileView] = useState(false);

  // Function to handle window resize and update the isMobileView state
  const handleWindowResize = () => {
    setIsMobileView(window.innerWidth < 768); // Adjust the breakpoint as needed
  };

  // Effect to set up the initial isMobileView state and add/remove the window resize listener
  useEffect(() => {
    handleWindowResize(); // Set initial state
    window.addEventListener('resize', handleWindowResize); // Add window resize listener
    return () => {
      window.removeEventListener('resize', handleWindowResize); // Remove window resize listener on unmount
    };
  }, []);
  const toggleCollapsed =() => {
    setCollapsed(!collapsed)
  }

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        marginLeft: token !== null ? '200px' : '0px', 
        width: token === null ? '100%': '' 
      }}
    >
      {/* Set the mode based on isMobileView state */}
      <Menu mode={isMobileView ? 'inline' : 'horizontal'} theme="light" selectedKeys={[router.pathname]} >
        {token !== null && (
          <Menu.Item>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
            />
          </Menu.Item>
        )}
        <Menu.Item key="/" onClick={() => navigateTo('/')}>
          Home
        </Menu.Item>
        {/* <Menu.Item key="/about" onClick={() => navigateTo('/about')}>
          About
        </Menu.Item> */}
        {token === null ? (
          <Menu.Item className="float-end me-3" key="/login" onClick={() => navigateTo('/login')}>
            Login
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
