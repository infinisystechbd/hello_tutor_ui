import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Row } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Axios from "../utils/axios";

const { Header } = Layout;

const Navbar = () => {
  const { http, setToken, token } = Axios();

  const colorBgContainer = '#ffffff';
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [margin, setMargin] = useState('0px');
  const [isAuth, setIsAuth] = useState('UnProtective-Nav')
  const onLogout = async () => {
    localStorage.clear();
    await router.replace("/");
    await router.reload();
  }

  const goToProfile = async () => {

  }
  const onChangePassword = async () => {
    
  }

  useEffect(()=> {
    if(token)
    {
      setMargin('200px');
      setIsAuth('navbar');
    }
  },[token])

  const navigateTo = (path) => {
    router.push(path);
  };

  const profileMenuItems = [
    {
      key: '1',
      label: <Row>Profile</Row>,
      onClick: goToProfile
    },
    {
      key: '2',
      label: <Row>Change password</Row>,
      onClick: onChangePassword
    },
    {
      key: '3',
      label: <Row>Logout</Row>,
      onClick: onLogout
    }
  ];


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
        marginLeft: margin,
        zIndex: 1000, 
        marginBottom: '100px',
      }}
      className={isAuth}
    >
      {/* Set the mode based on isMobileView state */}
      {/* <Menu mode={isMobileView ? 'horizontal' : 'horizontal'} theme="light" selectedKeys={[router.pathname]} defaultSelectedKeys={['/']}> */}
      <Menu  className='' mode={isMobileView ? 'horizontal' : 'horizontal'} theme="light" selectedKeys={[router.pathname || '/']} defaultSelectedKeys={['/']}>
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
        {token === null ? (
          <Menu.Item key="/login" className="float-end me-3" onClick={() => navigateTo('/login')}>
            Login
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <Button type="link" onClick={onLogout} icon={<LoginOutlined />} size="large" />
          </Menu.Item>
        )}
        {/* {
          token !== null ? (
            <Dropdown
            dropdownRender={(menu) => (
              <Menu
                onClick={({ item }) => item?.onClick}
                selectedKeys={[]}
                mode="inline"
                items={profileMenuItems}
              />
            )}
            trigger={['click']}
            placement="bottomRight"
            arrow
            className=" cursor-pointer my-3 mx-2">
            <i className="fas fa-user fa-lg"></i>
          </Dropdown>

          ) : (<></>)
        } */}
      </Menu>
    </Header>
  );
};

export default Navbar;
