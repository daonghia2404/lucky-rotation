import React from 'react';
import { Layout } from 'antd';

import Sidebar from '@/components/Sidebar';

import './Admin.scss';

const { Sider, Content } = Layout;

const Admin = ({ children }) => {
  return (
    <div className="Admin">
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;
