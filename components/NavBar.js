import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const { Header } = Layout;



const Navbar = ({ collapsed, toggleCollapsed }) => {
    const colorBgContainer = '#ffffff';

    const router = useRouter();
const onLogout = async () => {
  localStorage.clear();
  await router.replace("/");
  await router.reload();
}
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />


<span className="float-end me-3">

<Button type="link" onClick={onLogout}  icon={<LoginOutlined />} size="large">
      
  </Button>
        </span>
    </Header>
  );
};

export default Navbar;
