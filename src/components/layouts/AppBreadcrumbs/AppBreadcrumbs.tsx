import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { Route, LangNameSpace } from '../../../utils';
import { BreadcrumbItem } from '../../../typings/common';
import { useTranslation } from 'react-i18next';

const AppBreadcrumbs: React.FC = () => {
  const { t } = useTranslation(LangNameSpace.Common);
  const getBreadcrumbItems = () => {
    const items: BreadcrumbItem[] = [
      {
        title: <Link to={Route.Base}>{t('dashboard')}</Link>,
      },
    ];

    Object.entries(Route).forEach(([key, value]) => {
      if (useLocation().pathname.includes(value) && value !== Route.Base) {
        items.push({
          title:
            value !== Route.Customers ? (
              t(key.toLocaleLowerCase())
            ) : (
              <Link to={value}>{t(key.toLocaleLowerCase())}</Link>
            ),
        });
      }
    });

    return items;
  };

  return <Breadcrumb items={getBreadcrumbItems()} />;
};

export default AppBreadcrumbs;
