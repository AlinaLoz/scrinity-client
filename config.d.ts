declare module '@utils/config' {
  enum ENVIRONMENT_TYPE {
    DEVELOP = 'develop',
    MASTER = 'master',
    PROD = 'prod',
  }
  export const ENVIRONMENT: ENVIRONMENT_TYPE;
  export const API_URL: string;
  export const STATIC_FILES: string;
  export const EMAIL_JS: {
    USER_ID: string;
    SERVICE_ID: string;
    TEMPLATE: string;
  };
}
