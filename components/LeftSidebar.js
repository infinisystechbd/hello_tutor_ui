import React from 'react';
import { Menu, Layout } from 'antd';
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Sider } = Layout;

const Leftsidebar = ({ collapsed }) => {
  const router = useRouter();

  const menuItems = [

    {
      key: 'super_admin',
      icon: <FileOutlined />,
      label: 'Super Admin',
      children: [
      
        { key: 'users', label: 'User', path: '/modules/hrmModalV/users' },
      ],
    },
  
    {
      key: '/modules/hrmModalV',
      icon: <FileOutlined />,
      label: 'Master Data',
      children: [
        { key: 'subject', label: 'Subject', path: '/modules/hrmModalV/subject' },
        { key: 'class', label: 'Class', path: '/modules/hrmModalV/class' },
        { key: 'categorie', label: 'Category', path: '/modules/hrmModalV/categorie' },
        { key: 'city', label: 'City', path: '/modules/hrmModalV/city' },
        { key: 'location', label: 'Location', path: '/modules/hrmModalV/location' },
        { key: 'guardian', label: 'Guardian', path: '/modules/hrmModalV/guardian' },
        { key: 'tutor', label: 'Tutor', path: '/modules/hrmModalV/tutor' },
      ],
    },

    {
      key: 'job',
      icon: <FileOutlined />,
      label: 'Job Handeler',
      children: [
      
        { key: 'job', label: 'Tutor', path: '/modules/hrmModalV/jobRequest' },
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
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default Leftsidebar;
