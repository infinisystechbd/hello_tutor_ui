import { ContainerOutlined, DashboardOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';
import Axios from "../utils/axios";
const { Sider } = Layout;

const Leftsidebar = ({ collapsed }) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState(collapsed);

  const { http, setToken, token } = Axios();

  const [decodedToken, setDecodedToken] = useState(null); // Use state to hold the decoded token

  useEffect(() => {
    if (token) {
    const decoded = token ? jwt.decode(token) : null;
    setDecodedToken(decoded);
    }
  }, [token]);

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: decodedToken?.fullName,
      path: `/profile/${decodedToken?.userId}`
    },
    {
      key: 'dashboard',
      // icon: <DashboardOutlined />, 
      icon: <HomeOutlined />, 
      label: 'Dashboard',
      path: '/dashboard/dashboard'
    },
    {
      key: '/helloTutor',
      icon: <SettingOutlined />,
      label: 'Master Data',
      roles: [1], // Show this item for role 1 (admin)
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
      roles: [1], // Show this item for role 1 (admin)
      children: [
        { key: 'job', label: 'Job Creation', path: '/jobRequest' },
        { key: 'job Assign', label: 'Job Assign', path: '/jobAssign' },
      ],
    },
    {
      key: 'user_manage',
      icon: <UserOutlined />,
      label: 'User Manager',
      roles: [1],
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
  ];

  const handleMenuItemClick = (path) => {
    router.push(path, undefined, { shallow: true });
  };

  const renderedMenuItems = token
    ? menuItems.filter((item) => {
        if (role === 1 || !item.roles) {
          return true;
        }
        return item.roles.includes(role);
      })
    : [menuItems[0]];

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
    <Sider
      trigger={null}
      collapsible
      collapsed={collapse}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapse(broken);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {renderMenuItems(renderedMenuItems)}
      </Menu>
    </Sider>
  );
};

export default Leftsidebar;
