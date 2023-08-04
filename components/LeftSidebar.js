import { ContainerOutlined, DashboardOutlined, SettingOutlined,GlobalOutlined, UserOutlined,MenuOutlined,AuditOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import decodeToken from '../utils/decodeToken';
import Axios from '../utils/axios';

const { Sider } = Layout;

const Leftsidebar = ({ collapsed }) => {
  const router = useRouter();
  const [collapse, setCollapse] = useState(collapsed);
  const { http, setToken, token } = Axios();
  const [profile, setProfile] = useState({});
  const[role,setRole] = useState(null);
  console.log(profile);
  useEffect(() => {
    // Sample JWT token. Replace this with your actual token.
    const jwtToken = token;

    // Decode the JWT token
    const decodedToken = decodeToken(jwtToken);
    setProfile(decodedToken);
    setRole(decodedToken?.role)
}, [token]);


  const menuItems = [

    {
      key: 'profile',
      // icon: <DashboardOutlined />,
      icon: <GlobalOutlined />,
      label: 'Profile',
      path: '/profile'
    },
    {
      key: 'dashboard',
      // icon: <DashboardOutlined />,
      icon: <GlobalOutlined />,
      label: 'Dashboard',
      path: '/dashboard/dashboard'
    },
    {
      key: 'helloTutor',
      icon: <MenuOutlined />,
      // icon: <SettingOutlined />,
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
        { key: 'jobCreate', label: 'Job Creation', path: '/jobRequest' },
        { key: 'jobAssign', label: 'Job Assign', path: '/jobAssign' },
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
      // icon: <DashboardOutlined />,
      icon: <AuditOutlined />,
      label: 'Tutor Request',
      path: '/tutorRequest/form/TutorRequestForm'
    },

    {
      key: 'tutorProfile',
      icon: <UserOutlined />,
      label: 'Tutor Profile From',
      path: '/tutorFrom'
    },

    {
      key: 'tutorProfileTry',
      icon: <UserOutlined />,
      label: 'Tutor Profile From Try',
      path: '/tutorFromTry/Tutor_Create_from'
    },
    {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Setting',
      path: '/setting'
    },
  ];

  const handleMenuItemClick = (path) => {
    router.push(path, undefined, { shallow: true });
  };

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => {
      // Check if the menu item has children
      if (item.children) {
        // If the role is 1, show 'Master Data', 'Job Management', and 'User Manager' regardless of their children
        if (role === 1 && (item.key === 'helloTutor' || item.key === 'job' || item.key === 'user_manage')) {
          return (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {renderMenuItems(item.children)}
            </Menu.SubMenu>
          );
        } else {
          // If the role is not 1, skip 'Master Data', 'Job Management', and 'User Manager'
          return null;
        }
      }

      // For 'tutorRequest' menu item, show only if the role is 4
      if (item.key === 'tutorRequest' && role !== 4) {
        return null;
      }

      // For 'tutorProfile' and 'tutorProfileTry' menu items, show only if the role is 4
      if ((item.key === 'tutorProfile' || item.key === 'tutorProfileTry') && role !== 4) {
        return null;
      }

      // For regular menu items
      if (role === 1 || (role !== 4 && item.key !== 'helloTutor' && item.key !== 'job' && item.key !== 'user_manage')) {
        return (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuItemClick(item.path)}>
            <Link href={item.path}>
              <a style={{ textDecoration: 'none' }}>{item.label}</a>
            </Link>
          </Menu.Item>
        );
      }

      return null; // Skip rendering menu items not matching the conditions
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
