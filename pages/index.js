import React from 'react';
import { Breadcrumb,Layout,theme } from 'antd';
import Dashbord from '../pages/dashboard/dashboard'
const index = () => {
    const {Content} = Layout;
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  return (

  <>
  <Dashbord/>
  </>
  )
}

export default index