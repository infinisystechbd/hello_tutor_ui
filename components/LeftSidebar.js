import React, { useState } from 'react'
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
const LeftSidebar = () => {
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    function getItem(label, key, icon, children, path = '/') {
        return {
          key,
          icon,
          children,
          label,
          path,
        };
      }
    const items = [
        getItem('Option 1', '/modules/content', <PieChartOutlined />, null, '/modules/content'),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3', null, null, '/users/tom'),
            getItem('Bill', '4', null, null, '/users/bill'),
            getItem('Alex', '5', null, null, '/users/alex'),
          ], '/users'),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[router.pathname]}
          mode="inline"
          onSelect={({ key }) => router.push(key)}
          items={items}
        />
      </Sider>
    )
}

export default LeftSidebar