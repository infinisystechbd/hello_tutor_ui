import { HomeOutlined, LoginOutlined, MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Layout, Menu, Row } from 'antd';
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

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
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
      <Row justify="space-between" align="middle">
        <Col xs={20} sm={20} md={4}>
          <div
            className="logo"
            style={{ color: "black", paddingLeft: "20px" }}
          >
            Hello Tutor
          </div>
        </Col>
        <Col xs={0} sm={0} md={20}>
          <Menu Menu mode="horizontal" defaultSelectedKeys={["1"]} >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <div>


              <Menu.Item key="2" icon={<UserOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item key="3" icon={<SettingOutlined />}>
                Settings
              </Menu.Item>
            </div>
            <div style={{ marginLeft: "900px" }}>
            <Menu.Item key="4" >
              <Button type="primary">Sign in</Button>
            </Menu.Item>
            <Menu.Item key="5" >
              <Button>Sign up</Button>
            </Menu.Item>
            </div>
          </Menu>
        </Col>
        <Col xs={2} sm={2} md={0}>
          <Button type="primary" onClick={showDrawer}>
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
      >
        <Menu mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
         

          <Menu.Item key="4" style={{ marginLeft: "100px" }}>
            <Button type="primary" >
              Sign in
            </Button>
           
          </Menu.Item>

          <Menu.Item key="5">
      
            <Button>Sign up</Button>
          </Menu.Item>

        
        </Menu>
      </Drawer>
    </Header>
  );
};

export default Navbar;
