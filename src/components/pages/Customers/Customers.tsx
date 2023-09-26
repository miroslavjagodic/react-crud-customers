import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerService } from '../../../hooks';
import { Button, Space, Table, Tag, Skeleton } from 'antd';
import { ApiQuery, LangNameSpace, Route } from '../../../utils';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { CustomerResponse } from '../../../typings/customers';
import ModalDelete from '../../shared/ModalDelete';
import Modalnfo from '../../shared/Modalnfo';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ContentLayout } from '../../layouts';
import { toast } from 'react-toastify';

export interface TableDataType {
  key: string;
  name: string;
  id: string;
  projects: string;
  industry: string;
  active: boolean;
}

export interface TableData {
  columns: ColumnsType<TableDataType>;
  rows: TableDataType[];
}

const Customers: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteInfoModalOpen, setIsDeleteInfoModalOpen] =
    useState<boolean>(false);
  const [customerToDelete, setCustomerToDelete] = useState<{
    id: string;
    name: string;
  }>({ id: '', name: '' });
  const [refetchOnUpdate, setRefetchOnUpdate] = useState<boolean>(true);
  const { t } = useTranslation(LangNameSpace.Common);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = customerService.useGetCustomers({
    enabled: refetchOnUpdate,
  });
  const deleteCustomer = customerService.useDeleteCustomer();

  const onDeleteCustomerHandler = () => {
    deleteCustomer.mutate(
      { id: customerToDelete.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([ApiQuery.Customers]),
            setRefetchOnUpdate(true);
        },
        onError: () => {
          setIsDeleteModalOpen(false);
          toast.error(t('apiError'), {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        },
      }
    );
    setIsDeleteModalOpen(false);
  };

  const onDeleteButtonHandler = (item: TableDataType) => {
    if (item.active) {
      setIsDeleteInfoModalOpen(true);
      return;
    }
    setIsDeleteModalOpen(true);
    setCustomerToDelete({ name: item.name, id: item.id });
    setRefetchOnUpdate(false);
  };

  const prepareTableData = () => {
    const customersData = data as CustomerResponse[];
    const tableData: TableData = {
      columns: [
        {
          title: t('name'),
          dataIndex: 'name',
          key: 'name',
          render: (text, item) => (
            <Link to={`${Route.Customers}/${item.id}${Route.Details}`}>
              {text}
            </Link>
          ),
        },
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: t('projects'),
          dataIndex: 'projects',
          key: 'projects',
        },
        {
          title: t('industry'),
          dataIndex: 'industry',
          key: 'industry',
          render: (text) => <Tag color="default">{text}</Tag>,
        },
        {
          title: t('status'),
          key: 'tags',
          dataIndex: 'tags',
          render: (text, item) => (
            <Tag color={item.active ? 'success' : 'error'}>
              {item.active ? t('active') : t('inactive')}
            </Tag>
          ),
        },
        {
          title: t('actions'),
          key: 'action',
          render: (text, item) => (
            <Space size="middle">
              <Button
                shape="circle"
                icon={<EditFilled className="text-gray-500" />}
                onClick={() =>
                  navigate(`${Route.Customers}/${item.id}${Route.Edit}`)
                }
              />
              <Button
                shape="circle"
                icon={<DeleteFilled className="text-gray-500" />}
                onClick={() => onDeleteButtonHandler(item)}
              />
            </Space>
          ),
        },
      ],
      rows: [],
    };

    customersData?.forEach((item) => {
      tableData.rows.push({
        key: item.id,
        name: item.company,
        id: item.id,
        projects: item.projects && item.projects.length.toString(),
        industry: item.industry,
        active: item.isActive,
      });
    });

    return tableData;
  };

  const addCustomerBtn = (
    <Button
      type="primary"
      onClick={() => navigate(`${Route.Customers}${Route.Create}`)}>
      {t('addNewCustomer')}
    </Button>
  );

  return (
    <ContentLayout title={t('customers')} action={addCustomerBtn}>
      {isDeleteModalOpen && (
        <ModalDelete
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={onDeleteCustomerHandler}
          customerName={customerToDelete.name}
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
      {data ? (
        <Table
          columns={prepareTableData().columns}
          dataSource={prepareTableData().rows}
        />
      ) : (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </ContentLayout>
  );
};

export default Customers;
