import axios from 'axios';
import qs from 'qs';
import config from '@utils/config';

const { API_URL } = config;

/* eslint-disable  @typescript-eslint/no-explicit-any */
type TBody = any;

const executeSendRequest = (method: 'post' | 'patch' | 'put') => <T>(
  urlPath: string,
  body?: TBody,
  headers?: any,
) => {
  const url = `${API_URL}${urlPath}`;
  return axios[method](
    url,
    body,
    {
      ...headers,
      withCredentials: true,
    },
  ).then((item) => item.data as T);
};

const executeGetRequest = (method: 'get' | 'delete') => <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: any,
) => {
  let url = `${API_URL}${urlPath}`;
  if (query) {
    url += `?${qs.stringify(query, { encode: true, arrayFormat: 'brackets' })}`;
  }
  return axios[method]<Record<string, unknown>, { data: T }>(
    url, {
      withCredentials: true,
      headers,
    },
  ).then((item) => item.data);
};

export const post = executeSendRequest('post');
export const patch = executeSendRequest('patch');
export const put = executeSendRequest('put');
export const get = executeGetRequest('get');
export const del = executeGetRequest('delete');
