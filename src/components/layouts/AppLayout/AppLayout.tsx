import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BarChartOutlined,
  FireFilled,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import LangSwitcher from '../../shared/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { Route, LangNameSpace } from '../../../utils/enums';
import AppBreadcrumbs from '../AppBreadcrumbs';

type AppLayoutProps = {
  children: ReactNode;
};

const { Header, Sider } = Layout;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { t } = useTranslation(LangNameSpace.Common);
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="overflow-hidden h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex ml-2 h-16 items-center text-white">
          <div
            className={`flex ${
              collapsed ? 'flex-col' : 'flex-row gap-2 items-baseline'
            } cursor-pointer`}
            onClick={() => navigate(Route.Base)}>
            <div className="flex flex-row gap-1">
              <FireFilled className="font" />
              <span className="text-xl font-bold">BBQ</span>
            </div>
            <span className="text-xs tracking-widest">EVENTS</span>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="overflow-y-auto"
          style={{ height: 'calc(100vh - 64px)' }}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: t('dashboard'),
              onClick: () => navigate(Route.Base),
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: t('customers'),
              onClick: () => navigate(Route.Customers),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="flex flex-grow flex-row p-0 bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-base h-16 min-w-[4rem]"
          />
          <div className="flex-1 text-right pr-6">
            <LangSwitcher />
          </div>
        </Header>
        <div className="mt-4 ml-4">
          <AppBreadcrumbs />
        </div>
        {children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
