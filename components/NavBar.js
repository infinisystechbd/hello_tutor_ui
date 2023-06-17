import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
// import 'antd/dist/antd?css';

const NavBar = () => {

  return (
    // <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Menu style={{ display: 'flex', justifyContent: 'flex-end' }} mode="horizontal" theme="dark" defaultSelectedKeys={['home']}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  // </div>
  )
}

export default NavBar