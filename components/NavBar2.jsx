import { HomeOutlined, DashboardOutlined, LoginOutlined, SettingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Layout, Menu, Row } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Axios from "../utils/axios";

const { Header } = Layout;

const Navbar = () => {
  const { http, setToken, token } = Axios();

  const colorBgContainer = '#ffffff';
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState('0px');
  const [isAuth, setIsAuth] = useState('UnProtective-Nav');

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  const onLogout = async () => {
    localStorage.clear();
    await router.replace("/");
    await router.reload();
  };



  const { SubMenu } = Menu;

// Define a state variable to manage the selected key
const [selectedKey, setSelectedKey] = useState(router.pathname);

// Handle menu item click
const handleMenuClick = (key) => {
  setSelectedKey(key);
  navigateTo(key);
};

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: 0,
        background: colorBgContainer,
        marginLeft: margin,
        zIndex: 1000,
        marginBottom: '100px',
      }}
      className={isAuth}
    >
      <Row justify="space-between" align="middle">
        <Col xs={20} sm={20} md={4} onClick={() => navigateTo('/home')} style={{ background: "#0d6efd", }}>
          <div className="logo" style={{ color: "white", paddingLeft: "20px", fontSize: "24px", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            Hello Tutor
          </div>

        </Col>
        <Col xs={0} sm={0} md={20}>
        <Menu mode="horizontal" selectedKeys={[selectedKey]}>
        <div className="top-left-menu">
    <Menu.Item key="/home" icon={<HomeOutlined />} onClick={() => handleMenuClick('/home')}>
      Home
    </Menu.Item>

    <Menu.Item key="/dashboard" icon={<DashboardOutlined />} onClick={() => handleMenuClick('/')}>
      Dashboard
    </Menu.Item>
    </div>
    {token !== null && (
      <SubMenu title={<span className="submenu-title-wrapper">User</span>}>
        <Menu.Item key="/profile" icon={<UserOutlined />} onClick={() => handleMenuClick('/profile')}>
          Profile
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined />} onClick={() => handleMenuClick('/settings')}>
          Settings
        </Menu.Item>
      </SubMenu>
    )}

    <div style={{ marginLeft: 'auto' }}>
      {token === null ? (
        <>
          <Menu.Item key="/login">
            <Button
              type="primary"
              style={{ backgroundColor: '#007bff', color: '#fff' }}
              onClick={() => handleMenuClick('/login')}
            >
              Sign in
            </Button>
          </Menu.Item>
          <Menu.Item key="/register">
            <Button onClick={() => handleMenuClick('/register')}>Sign up</Button>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="logout">
          <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
        </Menu.Item>
      )}
    </div>
  </Menu>
        </Col>
        <Col xs={2} sm={2} md={0}>
          <Button type="primary" style={{ backgroundColor: "#007bff", color: "#fff", }} onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Col>
      </Row>
      <Drawer
        title="Menu"
        placement="right"
        onClick={onClose}
        onClose={onClose}
        visible={visible}
      // style={{backgroundColor: "#007bff",color: "#fff",}}
      >
        <Menu mode="vertical" defaultSelectedKeys={[router.pathname]}>
          <Menu.Item key="/" icon={<HomeOutlined />} onClick={() => navigateTo('/home')}>
            Home
          </Menu.Item>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />} onClick={() => navigateTo('/')}>
            Dashboard
          </Menu.Item>
          {token !== null && (
            <>
              <Menu.Item key="/profile" icon={<UserOutlined />} onClick={() => navigateTo('/profile')}>
                Profile
              </Menu.Item>
              <Menu.Item key="/settings" icon={<SettingOutlined />} onClick={() => navigateTo('/settings')}>
                Settings
              </Menu.Item>
            </>
          )}
          <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
            {token === null ? (
              <>

                <Button type="primary" onClick={() => navigateTo('/login')} style={{ backgroundColor: "#007bff", color: "#fff", }}>Sign in</Button>
                <Button type="primary" className='ml-5' onClick={() => navigateTo('/register')} style={{ backgroundColor: "#007bff", color: "#fff", }}>Sign Up</Button>
              </>
            ) : (
              <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
            )}
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
};

export default Navbar;
