export const AUTHORIZATION_TOKEN = 'Authorization';

export const NUMBER_REGEXP = /^[\d +]+$/;
export const BY_NUMBER_CODE_PLUS = '+375';
export const BY_NUMBER_MASK = '0000 00 000 00 00';
export const NUMBER_LENGTH = 17;

// eslint-disable-next-line max-len
export const validateEmail = (email: string) => !!/^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(email);
