import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateCustomerForm, LangNameSpace } from '../../../utils';
import { Button, Card, DatePicker, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteFilled } from '@ant-design/icons';
import { FormErrorProjects } from '../../../typings/customers';
import dayjs from 'dayjs';

type CustomerProjectProps = {
  id: number;
  onRemove: (index: number) => void;
};

const CustomerProject: React.FC<CustomerProjectProps> = ({ id, onRemove }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation(LangNameSpace.Common);

  const isError = (id: number, fieldName: string): boolean => {
    const fromError = errors.projects as unknown as FormErrorProjects[];
    const errorItem: FormErrorProjects = fromError && fromError[id];
    return errorItem && Object.keys(errorItem).includes(fieldName);
  };

  return (
    <Card
      key={id}
      className="flex flex-col"
      title={`${t('project')} ${id + 1}`}
      extra={
        <Button
          shape="circle"
          icon={<DeleteFilled className="text-gray-500" />}
          onClick={() => onRemove(id)}
        />
      }>
      <Controller
        name={`${CreateCustomerForm.Projects}.${id}.${CreateCustomerForm.Name}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col mb-5">
            <p
              className={`m-0 mb-2 ${
                isError(id, CreateCustomerForm.Name) && 'text-red-500'
              }`}>
              {t('name')}*
            </p>
            <Input
              id={CreateCustomerForm.Company}
              placeholder={t('name')}
              value={value}
              onChange={onChange}
              status={
                isError(id, CreateCustomerForm.Name) ? 'error' : undefined
              }
            />
          </div>
        )}
      />
      <Controller
        name={`${CreateCustomerForm.Projects}.${id}.${CreateCustomerForm.Contact}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col mb-5">
            <p
              className={`m-0 mb-2 ${
                isError(id, CreateCustomerForm.Contact) && 'text-red-500'
              }`}>
              {t('contact')}*
            </p>
            <Input
              id={CreateCustomerForm.Company}
              placeholder={t('contact')}
              type="email"
              value={value}
              onChange={onChange}
              status={
                isError(id, CreateCustomerForm.Contact) ? 'error' : undefined
              }
            />
          </div>
        )}
      />
      <Controller
        name={`${CreateCustomerForm.Projects}.${id}.${CreateCustomerForm.StartDate}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col mb-5">
            <p
              className={`m-0 mb-2 ${
                isError(id, CreateCustomerForm.StartDate) && 'text-red-500'
              }`}>
              {t('startDate')}
            </p>
            <DatePicker
              defaultValue={value ? dayjs(value) : undefined}
              id={CreateCustomerForm.StartDate}
              placeholder={t('chooseDate')}
              onChange={onChange}
              status={
                isError(id, CreateCustomerForm.StartDate) ? 'error' : undefined
              }
            />
          </div>
        )}
      />
      <Controller
        name={`${CreateCustomerForm.Projects}.${id}.${CreateCustomerForm.EndDate}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col mb-5">
            <p
              className={`m-0 mb-2 ${
                isError(id, CreateCustomerForm.EndDate) && 'text-red-500'
              }`}>
              {t('endDate')}
            </p>
            <DatePicker
              defaultValue={value ? dayjs(value) : undefined}
              id={CreateCustomerForm.EndDate}
              placeholder={t('chooseDate')}
              onChange={onChange}
              status={
                isError(id, CreateCustomerForm.EndDate) ? 'error' : undefined
              }
            />
          </div>
        )}
      />
    </Card>
  );
};

export default CustomerProject;
