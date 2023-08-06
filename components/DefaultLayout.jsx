import { Layout } from 'antd';
import React, { useState } from 'react';
import Axios from "../utils/axios";
import Footer from './Footer';
import Leftsidebar from './LeftSidebar';
import Navbar from './NavBar';

const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { http, setToken, token } = Axios();
  const {Content} = Layout;
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const colorBgContainer = '#F2F5FC';
  const leftSide = token !== null ? {marginLeft: 200} : {marginLeft: 0, marginTop: 100};
  return (
    <Layout style={{ minHeight: '100vh' }}>
       {/* <Leftsidebar collapsed={collapsed}/> */}
       {token !== null && 
        <Leftsidebar collapsed={collapsed} />
       }
       <Navbar collapsed={collapsed} toggleCollapsed={toggleCollapsed} colorBgContainer={colorBgContainer}/>
       <Layout>
        <Layout className={'site-layout '} style={leftSide} >
        {/* <Layout className={'site-layout '}  > */}
         
            {children}
         
          </Layout>
       
        
        </Layout>
        <Footer/>
        </Layout>
  )
}

export default DefaultLayout