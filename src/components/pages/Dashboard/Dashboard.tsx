import React from 'react';
import { ContentLayout } from '../../layouts';
import { useTranslation } from 'react-i18next';
import { LangNameSpace } from '../../../utils';

const Dashboard = () => {
  const { t } = useTranslation(LangNameSpace.Common);
  return (
    <ContentLayout title={t('dashboard')}>
      <p>Content</p>
    </ContentLayout>
  );
};

export default Dashboard;
