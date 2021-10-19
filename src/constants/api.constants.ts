export const COMPANIES_API = 'companies';
export const COMPANIES_BY_ID_API = (id: string): string => `${COMPANIES_API}/${id}`;
