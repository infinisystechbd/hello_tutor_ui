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
        getItem('Master Data', 'sub1', <UserOutlined />, [
            getItem('Subject', '/modules/hrmModalV/subject', null, null, '/modules/hrmModalV/subject'),
            getItem('Class', '/modules/hrmModalV/class', null, null, '/modules/hrmModalV/class'),
            getItem('Category', '/modules/hrmModalV/categorie', null, null, '/modules/hrmModalV/categorie'),
            getItem('City', '/modules/hrmModalV/city', null, null, '/modules/hrmModalV/city'),
            getItem('Location', '/modules/hrmModalV/location', null, null, '/modules/hrmModalV/location'),
            getItem('Guardian', '/modules/hrmModalV/guardian', null, null, '/modules/hrmModalV/guardian'),
            getItem('Tutor', '/modules/hrmModalV/tutor', null, null, '/modules/hrmModalV/tutor'),
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