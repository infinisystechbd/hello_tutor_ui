import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Axios from "../utils/axios";

const { Header } = Layout;

const Navbar = () => {
  const { http, setToken, token } = Axios();

  const colorBgContainer = '#ffffff';
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const onLogout = async () => {
    localStorage.clear();
    await router.replace("/");
    await router.reload();
  }

  const navigateTo = (path) => {
    router.push(path);
  };


  const [isMobileView, setIsMobileView] = useState(false);


  const handleWindowResize = () => {
    setIsMobileView(window.innerWidth < 768); 
  };


  useEffect(() => {
    handleWindowResize(); 
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize); 
    };
  }, []);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Header

      style={{
        position: 'fixed', 
        top: 0, // Stick it to the top
        width: '100%', // Make it full width
        padding: 0,
        background: colorBgContainer,
        marginLeft: token !== null ? '200px' : '0px',
        zIndex: 1000, 
        marginBottom: '100px',
      }}
      className='navbar'
    >
      {/* Set the mode based on isMobileView state */}
      <Menu mode={isMobileView ? 'horizontal' : 'horizontal'} theme="light" selectedKeys={[router.pathname]} >
        {token !== null && (
          <Menu.Item key="toggle">
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
          <Menu.Item key="/login" className="float-end me-3" onClick={() => navigateTo('/login')}>
            Login
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
