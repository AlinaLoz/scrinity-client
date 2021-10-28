import axios from 'axios';
import qs from 'qs';
import config from '@utils/config';

const { API_URL } = config;

const executeSendRequest = (method: 'post' | 'patch' | 'put') => <T>(
  urlPath: string,
  body?: Record<string, any>,
) => {
  const url = `${API_URL}${urlPath}`;
  return axios[method]<Record<string, unknown> | undefined, { data: T }>(
    url,
    body ? { ...body } : undefined,
    { withCredentials: true },
  ).then((item) => item.data);
};

const executeGetRequest = (method: 'get' | 'delete') => <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: Record<string, string>,
) => {
  let url = `${API_URL}${urlPath}`;
  if (query) {
    url += `?${qs.stringify(query, { encode: true, arrayFormat: 'brackets' })}`;
  }

  return axios[method]<Record<string, unknown>, { data: T }>(
    url, { withCredentials: true, headers },
  ).then((item) => item.data);
};

export const post = executeSendRequest('post');
export const patch = executeSendRequest('patch');
export const put = executeSendRequest('put');
export const get = executeGetRequest('get');
export const del = executeGetRequest('delete')
