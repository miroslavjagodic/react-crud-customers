import React, { useState } from 'react';
import { customerService } from '../../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomerResponse } from '../../../typings/customers';
import { ContentLayout } from '../../layouts';
import { useTranslation } from 'react-i18next';
import { LangNameSpace, Route } from '../../../utils';
import {
  Button,
  Collapse,
  Divider,
  Tag,
  Descriptions,
  Empty,
  Card,
  Skeleton,
} from 'antd';
import type { CollapseProps, DescriptionsProps } from 'antd';
import { formatToDate } from '../../../utils';
import ModalDelete from '../../shared/ModalDelete';
import Modalnfo from '../../shared/Modalnfo';

const CustomerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(LangNameSpace.Common);
  const customerId = location.pathname.split('/')[2];
  const { data } = customerService.useGetCustomer(customerId);
  const dataCustomer = data as CustomerResponse;
  const deleteCustomer = customerService.useDeleteCustomer();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteInfoModalOpen, setIsDeleteInfoModalOpen] =
    useState<boolean>(false);

  const addCustomerBtn = (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          navigate(`${Route.Customers}/${customerId}${Route.Edit}`)
        }>
        {t('edit')}
      </Button>
      <Button type="primary" danger onClick={() => onDeleteButtonHandler()}>
        {t('delete')}
      </Button>
    </div>
  );

  const onDeleteCustomerHandler = () => {
    deleteCustomer.mutate(
      { id: customerId },
      {
        onSuccess: () => {
          navigate(Route.Customers);
        },
      }
    );
    setIsDeleteModalOpen(false);
  };

  const onDeleteButtonHandler = () => {
    if (dataCustomer.isActive) {
      setIsDeleteInfoModalOpen(true);
      return;
    }
    setIsDeleteModalOpen(true);
  };

  const customerDescriptionData: DescriptionsProps['items'] = [
    {
      key: '1',
      label: t('status'),
      children: (
        <>
          {dataCustomer ? (
            <Tag
              color={
                dataCustomer && dataCustomer.isActive ? 'success' : 'error'
              }
              className="h-6">
              {dataCustomer.isActive ? t('active') : t('inactive')}
            </Tag>
          ) : (
            <span>{t('noData')}</span>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: t('industry'),
      children: (
        <>
          {dataCustomer && dataCustomer.industry ? (
            <Tag color="default" className="h-6">
              {dataCustomer && dataCustomer.industry}
            </Tag>
          ) : (
            <span>{t('noData')}</span>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: t('about'),
      children: (
        <>
          {dataCustomer && dataCustomer.about ? (
            <span>{dataCustomer && dataCustomer.about}</span>
          ) : (
            <span>{t('noData')}</span>
          )}
        </>
      ),
    },
  ];

  const customerProjectData: CollapseProps['items'] =
    dataCustomer &&
    dataCustomer.projects &&
    dataCustomer.projects.map((item) => {
      return {
        key: item.id,
        label: item.name,
        children: (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="font-semibold">{t('contact')}</span>
              <span>{item.contact}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{t('startDate')}</span>
              <span>{formatToDate(item.start_date)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{t('endDate')}</span>
              <span>{formatToDate(item.end_date)}</span>
            </div>
          </div>
        ),
      };
    });

  return (
    <ContentLayout title={t('customerDetails')} action={addCustomerBtn}>
      {dataCustomer ? (
        <>
          <p className="text-lg font-semibold m-0 mb-3">
            {dataCustomer && dataCustomer.company}
          </p>
          <div className="flex flex-col gap-5">
            <Divider orientation="left" orientationMargin="0">
              {t('details')}
            </Divider>
            <Descriptions
              layout="vertical"
              items={customerDescriptionData}
              column={2}
              bordered
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Divider orientation="left" orientationMargin="0">
              {t('projects')}
            </Divider>
            {dataCustomer &&
            dataCustomer.projects &&
            dataCustomer.projects.length > 0 ? (
              <Collapse accordion items={customerProjectData} />
            ) : (
              <Card>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            )}
          </div>
        </>
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
      {isDeleteModalOpen && (
        <ModalDelete
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={onDeleteCustomerHandler}
          customerName={dataCustomer.company}
        />
      )}
      {isDeleteInfoModalOpen && (
        <Modalnfo
          isOpen={isDeleteInfoModalOpen}
          onCancel={() => setIsDeleteInfoModalOpen(false)}
          onConfirm={() => setIsDeleteInfoModalOpen(false)}
          textTitle={t('modal.deleteCustomer')}
          textSubtitle={t('modal.activeCustomerMesssage')}
          textDetails={t('modal.activeCustomerInfoMessage')}
        />
      )}
    </ContentLayout>
  );
};

export default CustomerDetails;
