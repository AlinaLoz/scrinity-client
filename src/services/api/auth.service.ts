import { REQUEST_CONFIRM_CODE_API, VERIFY_CONFIRM_CODE_API } from '@constants/api.constants';
import { post } from '@helpers/axios.helpers';

export function requestConfirmCode(phoneNumber: string): Promise<boolean> {
  return post(REQUEST_CONFIRM_CODE_API, { phoneNumber });
}

export function verifyConfirmCode(data: { phoneNumber: string, code: string }): Promise<boolean> {
  return post(VERIFY_CONFIRM_CODE_API, data);
}
