import config from '@utils/config';
import { get, post } from './fetch-wrapper';

const API_URL = config.API_URL;
const PREFIX = 'task';
const URL = `${API_URL}/${PREFIX}`;

export function getAllTask<T>() {
	return get<T>(URL);
}

export function addTask<T, U>(data: T) {
	return post<T, U>(`${URL}/add`, data);
}

export default {
	getAllTask,
	addTask,
};
