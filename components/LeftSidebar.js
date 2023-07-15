import { DashboardOutlined, FileOutlined,UserOutlined,SettingOutlined,ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { Sider } = Layout;

const Leftsidebar = ({collapsed}) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState(collapsed);

  const menuItems = [


    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/dashboard/dashboard'
    },
  
    {
      key: '/helloTutor',
      icon: <SettingOutlined />,
      label: 'Master Data',
      children: [
        { key: 'subject', label: 'Subject', path: '/helloTutor/subject' },
        { key: 'class', label: 'Class', path: '/helloTutor/class' },
        { key: 'categorie', label: 'Category', path: '/helloTutor/categorie' },
        { key: 'city', label: 'City', path: '/helloTutor/city' },
        { key: 'location', label: 'Location', path: '/helloTutor/location' },
        
      ],
    },

    {
      key: 'job',
      icon: <ContainerOutlined />,
      label: 'Job Management',
      children: [
      
        { key: 'job', label: 'Job Creation', path: '/helloTutor/jobRequest' },
        { key: 'job Assign', label: 'Job Assign', path: '/helloTutor/jobAssign' },
      ],
    },

    {
      key: 'user_manage',
      icon: <UserOutlined />,
      label: 'User Manager',
      children: [
      
        { key: 'users', label: 'User', path: '/helloTutor/users' },
        { key: 'guardian', label: 'Guardian', path: '/helloTutor/guardian' },
        { key: 'tutor', label: 'Tutor', path: '/helloTutor/tutor' },
      ],
    },
  ];

  const handleMenuItemClick = (path) => {
    router.push(path, undefined, { shallow: true });
  };

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
        <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuItemClick(item.path)}>
          <Link href={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapse} breakpoint="md"
    onBreakpoint={(broken) => {
      setCollapse(broken);
    }}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default Leftsidebar;
