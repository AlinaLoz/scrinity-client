import config from '@utils/config';
import { REQUEST_CONFIRM_CODE_API, VERIFY_CONFIRM_CODE_API } from '@constants/api.constants';
import { post } from './fetch-wrapper';

const { API_URL } = config;
const GET_URL = (url: string): string => `${API_URL}/${url}`;

export function requestConfirmCode(phoneNumber: string): Promise<boolean> {
  return post(GET_URL(REQUEST_CONFIRM_CODE_API), { phoneNumber });
}

export function verifyConfirmCode(data: { phoneNumber: string, code: string }): Promise<boolean> {
  return post(GET_URL(VERIFY_CONFIRM_CODE_API), data);
}
