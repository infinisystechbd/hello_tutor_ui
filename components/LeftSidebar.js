import { ContainerOutlined, DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const { Sider } = Layout;

const Leftsidebar = ({ collapsed }) => {
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
        { key: 'subject', label: 'Subject', path: '/subject' },
        { key: 'class', label: 'Class', path: '/class' },
        { key: 'categorie', label: 'Category', path: '/categorie' },
        { key: 'city', label: 'City', path: '/city' },
        { key: 'location', label: 'Location', path: '/location' },
      ],
    },
    {
      key: 'job',
      icon: <ContainerOutlined />,
      label: 'Job Management',
      children: [
        { key: 'job', label: 'Job Creation', path: '/jobRequest' },
        { key: 'job Assign', label: 'Job Assign', path: '/jobAssign' },
      ],
    },
    {
      key: 'user_manage',
      icon: <UserOutlined />,
      label: 'User Manager',
      children: [
        { key: 'users', label: 'User', path: '/users' },
        { key: 'guardian', label: 'Guardian', path: '/guardian' },
        { key: 'tutor', label: 'Tutor', path: '/tutor' },
      ],
    },

    {
      key: 'tutorRequest',
      icon: <DashboardOutlined />,
      label: 'Tutor Request',
      path: '/tutorRequest/form/TutorRequestForm'
    },

    {
      key: 'tutorProfile',
      icon: <UserOutlined />,
      label: 'Tutor Profile From',
      path: '/tutorFrom/Tutor_Create_from'
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
          <Link href={item.path}>
            <a style={{ textDecoration: 'none' }}>{item.label}</a>
          </Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Layout hasSider>
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      breakpoint="md"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      onBreakpoint={(broken) => {
        setCollapse(broken);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
    </Layout>
  );
};

export default Leftsidebar;
