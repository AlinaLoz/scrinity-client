import { REQUEST_CONFIRM_CODE_API, SIGN_OUT_API, VERIFY_CONFIRM_CODE_API } from '@constants/api.constants';
import { post } from '@helpers/axios.helpers';

export function requestConfirmCodeAPI(phoneNumber: string): Promise<boolean> {
  return post(REQUEST_CONFIRM_CODE_API, { phoneNumber });
}

export function verifyConfirmCodeAPI(data: { phoneNumber: string, code: string }): Promise<{ token: string }> {
  return post(VERIFY_CONFIRM_CODE_API, data);
}

export function signOutAPI(): Promise<void> {
  return post(SIGN_OUT_API);
}
