import React, { useState } from 'react';
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';

const { Sider } = Layout;

const LeftSidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '/modules/content',
      icon: <PieChartOutlined />,
      label: 'Option 1',
      path: '/modules/content',
    },
    {
      key: '/modules/hrmModalV',
      icon: <UserOutlined />,
      label: 'Master Data',
      children: [
        { key: '/modules/hrmModalV/subject', label: 'Subject' },
        { key: '/modules/hrmModalV/class', label: 'Class' },
        { key: '/modules/hrmModalV/categorie', label: 'Category' },
        { key: '/modules/hrmModalV/city', label: 'City' },
        { key: '/modules/hrmModalV/location', label: 'Location' },
        { key: '/modules/hrmModalV/guardian', label: 'Guardian' },
        { key: '/modules/hrmModalV/tutor', label: 'Tutor' },
      ],
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Team',
      children: [
        { key: '6', label: 'Team 1' },
        { key: '8', label: 'Team 2' },
      ],
    },
    { key: '9', icon: <FileOutlined />, label: 'Files' },
  ];

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      );
    });
  };


 

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="fixed-sidebar">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={[router.pathname]}
        mode="inline"
        onSelect={({ key }) => router.push(key)}
      >
        {renderMenuItems(items)}
      </Menu>
    </Sider>
  );
};

export default LeftSidebar;
