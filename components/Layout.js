import React from 'react'
import LeftSidebar from './LeftSidebar'
import NavBar from './NavBar'
import Footer from './Footer'

import { Breadcrumb, Layout, Menu, theme } from 'antd';


const index = ({ children }) => {
  const { Header, Content, Sider } = Layout;
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >

      <LeftSidebar />

      <Layout>
        <NavBar />
        {children}
        <Footer />
      </Layout>
    </Layout>
  )
}

export default index