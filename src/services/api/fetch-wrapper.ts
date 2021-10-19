import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'query-string';

const DEFAULT_OPTIONS = { withCredentials: true };

async function executeRequest<T>(url: string, data: AxiosRequestConfig): Promise<T> {
  const request = {
    url,
    ...data,
    ...DEFAULT_OPTIONS,
  };
  const response = await axios.request(request);
  return response.data as T;
}

export function get<T>(path: string, query?: Record<string, string>, config?: AxiosRequestConfig): Promise<T> {
  const preparePath = query ? `${path}?${stringify(query)}` : path;
  const data = { method: 'get', ...config } as AxiosRequestConfig;
  return executeRequest<T>(preparePath, data);
}

export function post<T, U>(path: string, body: T, config?: AxiosRequestConfig): Promise<U> {
  const data = { method: 'post', body: JSON.stringify(body), ...config } as AxiosRequestConfig;
  return executeRequest<U>(path, data);
}

export function put<T, U>(path: string, body: T, config?: AxiosRequestConfig): Promise<U> {
  const data = { method: 'put', body: JSON.stringify(body), ...config } as AxiosRequestConfig;
  return executeRequest<U>(path, data);
}

export function patch<T, U>(path: string, body: T, config?: AxiosRequestConfig): Promise<U> {
  const data = { method: 'patch', body: JSON.stringify(body), ...config } as AxiosRequestConfig;
  return executeRequest<U>(path, data);
}

export function del<T, U>(path: string, body: T, config?: AxiosRequestConfig): Promise<U> {
  const data = { method: 'delete', body: JSON.stringify(body), ...config } as AxiosRequestConfig;
  return executeRequest<U>(path, data);
}
