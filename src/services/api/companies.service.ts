import config from '@utils/config';

import { COMPANIES_BY_ID_API } from '@constants/api.constants';
import { IGetCompanyAPIResponse } from '@interfaces/companies.interfaces';
import { get } from './fetch-wrapper';

const { API_URL } = config;
const GET_URL = (url: string): string => `${API_URL}/${url}`;

export function getCompanyAPI(id: string): Promise<IGetCompanyAPIResponse> {
  return get(GET_URL(COMPANIES_BY_ID_API(id)));
}
