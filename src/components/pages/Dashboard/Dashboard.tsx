import React from 'react';
import { ContentLayout } from '../../layouts';
import { useTranslation } from 'react-i18next';
import { LangNameSpace, Route } from '../../../utils';
import { customerService } from '../../../hooks';
import { Button, Card, Tag } from 'antd';
import { CustomerResponse } from '../../../typings/customers';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation(LangNameSpace.Common);
  const navigate = useNavigate();
  const { data } = customerService.useGetCustomers();

  const customersData = data as CustomerResponse[];
  const numberOfProjects = customersData
    ? customersData.reduce((acc, curr) => acc + curr.projects.length, 0)
    : 0;

  const getUinqueIdustries = () => {
    const industries: string[] = customersData
      ? customersData.map((customer) => customer.industry)
      : [];
    const uniqueIndustries: string[] = [];

    for (const industry of industries) {
      if (!uniqueIndustries.includes(industry)) {
        uniqueIndustries.push(industry);
      }
    }

    return uniqueIndustries;
  };

  return (
    <ContentLayout title={t('dashboard')}>
      <Card
        className="flex flex-col"
        title={t('customers')}
        extra={
          <Button
            shape="circle"
            icon={<RightOutlined className="text-gray-500" />}
            onClick={() => navigate(Route.Customers)}
          />
        }>
        <p className="font-bold">{t('customersNumber')}</p>
        {customersData && customersData.length}
        <p className="font-bold">{t('projectsNumber')}</p>
        {numberOfProjects}
        <p className="font-bold">{t('industries')}</p>
        {getUinqueIdustries().map((el) => (
          <Tag color="default">{el}</Tag>
        ))}
      </Card>
    </ContentLayout>
  );
};

export default Dashboard;
