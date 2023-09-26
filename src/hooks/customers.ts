import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  CustomerResponse,
  CustomerCreate,
  CustomerEdit,
} from '../typings/customers';
import { Route, ApiQuery } from '../utils/enums';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}${Route.Customers}`;

const useGetCustomers = (
  options: UseQueryOptions<CustomerResponse[], AxiosError> = {}
): UseQueryResult => {
  return useQuery<CustomerResponse[], AxiosError>(
    [ApiQuery.Customers],
    async () => {
      const { data } = await axios.get(BASE_URL);
      return data;
    },
    options
  );
};

const useGetCustomer = (
  id: string,
  options: UseQueryOptions<CustomerResponse, AxiosError> = {}
): UseQueryResult<CustomerResponse, AxiosError> => {
  return useQuery<CustomerResponse, AxiosError>(
    [ApiQuery.Customer, id],
    async () => {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    },
    options
  );
};

const useCreateCustomer = (
  options?: UseMutationOptions<
    CustomerCreate,
    AxiosError,
    CustomerCreate,
    unknown
  >
): UseMutationResult<CustomerCreate, AxiosError, CustomerCreate, unknown> => {
  return useMutation(
    [ApiQuery.CustomerCreate],
    async (params: CustomerCreate) => {
      const { data } = await axios.post(BASE_URL, params);
      return data;
    },
    { ...options }
  );
};

const useEditCustomer = (
  id: string,
  options?: UseMutationOptions<CustomerEdit, AxiosError, CustomerEdit, unknown>
): UseMutationResult<CustomerEdit, AxiosError, CustomerEdit, unknown> => {
  return useMutation(
    [ApiQuery.CustomerEdit, id],
    async (params: CustomerEdit) => {
      const { data } = await axios.put(`${BASE_URL}/${id}`, params);
      return data;
    },
    { ...options }
  );
};

const useDeleteCustomer = (): UseMutationResult<
  AxiosError,
  void,
  {
    id: string;
    options?: UseMutationOptions<
      CustomerResponse,
      AxiosError,
      CustomerResponse,
      unknown
    >;
  }
> => {
  return useMutation([ApiQuery.CustomerDelete], async ({ id }) => {
    const { data } = await axios.delete(`${BASE_URL}/${id}`);
    return data;
  });
};

const customerService = {
  useGetCustomers,
  useGetCustomer,
  useCreateCustomer,
  useEditCustomer,
  useDeleteCustomer,
};

export default customerService;
