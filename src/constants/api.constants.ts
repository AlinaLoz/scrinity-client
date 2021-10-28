export const COMPANIES_API = '/companies';
export const COMPANIES_BY_ID_API = (id: string): string => `${COMPANIES_API}/${id}`;

export const REQUEST_CONFIRM_CODE_API = '/auth/request-confirm-code';
export const VERIFY_CONFIRM_CODE_API = '/auth/verify-confirm-code';

export const SEND_FEEDBACK_API = '/feedback';
