import React, { useEffect } from 'react';
import { customerService } from '../../../hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContentLayout } from '../../layouts';
import { useTranslation } from 'react-i18next';
import {
  CreateCustomerForm,
  LangNameSpace,
  Route,
  formatToDate,
} from '../../../utils';
import { CustomerResponse, Project } from '../../../typings/customers';
import { Button, Divider, Input, Select, Skeleton } from 'antd';
import {
  Controller,
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import CustomerProject from '../../shared/CustomerProject';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

const CustomerEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(LangNameSpace.Common);
  const customerId = location.pathname.split('/')[2];
  const { data } = customerService.useGetCustomer(customerId);
  const dataCustomer = data as CustomerResponse;
  const editCustomer = customerService.useEditCustomer(customerId);

  const defaultValue: { id: string } = {
    id: uuid(),
  };

  const form = useForm<FieldValues>();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: CreateCustomerForm.Projects,
    control,
  });

  useEffect(() => {
    dataCustomer &&
      dataCustomer.projects &&
      dataCustomer.projects.map((project) => append(project));
    return () => {
      form.reset();
    };
  }, [dataCustomer]);

  const onSubmit = () => {
    const values = getValues();
    const payloadProjects = values.projects.map((project: Project) => {
      return {
        id: uuid(),
        name: project.name,
        contact: project.contact,
        start_date: formatToDate(project.start_date),
        end_date: formatToDate(project.end_date),
      };
    });
    const payloadCustomer = {
      id: uuid(),
      isActive: !!values.status,
      company: values.company,
      industry: values.industry,
      about: values.about,
      projects: payloadProjects,
    };
    editCustomer.mutate(payloadCustomer, {
      onSuccess: () => {
        navigate(Route.Customers);
      },
      onError: () => {
        toast.error(t('apiError'), {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        });
      },
    });
  };

  const onRemoveProjectHandler = (index: number) => {
    remove(index);
  };

  const submitButton = (
    <Button type="primary" onClick={handleSubmit(onSubmit)}>
      {t('submit')}
    </Button>
  );

  return (
    <ContentLayout title={t('editCustomer')} action={submitButton}>
      {dataCustomer ? (
        <>
          <p className="text-lg font-semibold m-0 mb-3">
            {dataCustomer && dataCustomer.company}
          </p>
          <div className="flex flex-col gap-5">
            <Divider orientation="left" orientationMargin="0">
              {t('details')}
            </Divider>
            <FormProvider {...form}>
              <form className="flex flex-col w-1/2 gap-5">
                <Controller
                  name={CreateCustomerForm.Company}
                  control={control}
                  rules={{ required: true }}
                  defaultValue={dataCustomer.company}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col">
                      <p
                        className={`m-0 mb-2 ${
                          errors.company && 'text-red-500'
                        }`}>
                        {t('company')}*
                      </p>
                      <Input
                        defaultValue={dataCustomer.company}
                        placeholder={t('companyName')}
                        value={value}
                        onChange={onChange}
                        status={errors.company ? 'error' : undefined}
                      />
                    </div>
                  )}
                />
                <Controller
                  name={CreateCustomerForm.Status}
                  control={control}
                  rules={{ required: true }}
                  defaultValue={dataCustomer.isActive ? 1 : 0}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col">
                      <p
                        className={`m-0 mb-2 ${
                          errors.status && 'text-red-500'
                        }`}>
                        {t('status')}*
                      </p>
                      <Select
                        defaultValue={dataCustomer.isActive ? 1 : 0}
                        placeholder={t('selectStatus')}
                        onChange={onChange}
                        value={value}
                        options={[
                          { value: 1, label: t('active') },
                          { value: 0, label: t('inactive') },
                        ]}
                        status={errors && errors.status ? 'error' : undefined}
                      />
                    </div>
                  )}
                />
                <Controller
                  name={CreateCustomerForm.Industry}
                  control={control}
                  defaultValue={dataCustomer.industry}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col">
                      <p className="m-0 mb-2">{t('industry')}</p>
                      <Input
                        defaultValue={dataCustomer.industry}
                        id={CreateCustomerForm.Company}
                        placeholder={t('industryName')}
                        value={value}
                        onChange={onChange}
                      />
                    </div>
                  )}
                />
                <Controller
                  name={CreateCustomerForm.About}
                  control={control}
                  defaultValue={dataCustomer.about}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col">
                      <p className="m-0 mb-2">{t('about')}</p>
                      <Input.TextArea
                        defaultValue={dataCustomer.about}
                        id={CreateCustomerForm.Company}
                        placeholder={t('companyDescription')}
                        value={value}
                        onChange={onChange}
                        showCount
                        maxLength={250}
                        className="h-36"
                      />
                    </div>
                  )}
                />
                <Divider orientation="left" orientationMargin="0">
                  {t('projects')}
                </Divider>
                {fields.map((item, index) => (
                  <CustomerProject
                    key={item.id}
                    id={index}
                    onRemove={onRemoveProjectHandler}
                  />
                ))}
                <div className="flex gap-3 align-middle">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => append(defaultValue)}
                  />
                  <p>{t('addProject')}</p>
                </div>
              </form>
            </FormProvider>
          </div>
        </>
      ) : (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      )}
    </ContentLayout>
  );
};

export default CustomerEdit;
