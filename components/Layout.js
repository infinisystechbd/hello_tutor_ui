import { Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Leftsidebar from '../components/LeftSidebar';
import Navbar from '../components/NavBar';
// import CustomContent from './Content';

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const {Content} = Layout;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const colorBgContainer = '#ffffff';
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Leftsidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} colorBgContainer={colorBgContainer} />

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
     {/*    {children} */}
        </Layout>
      <Footer/>
      </Layout>
    </Layout>
  );
};

export default App;
