import { IGetConfigAPIResponse } from '@interfaces/config.interfaces';
import { get } from '@helpers/axios.helpers';
import { CONFIG_API } from '@constants/api.constants';

export function getConfig(): Promise<IGetConfigAPIResponse> {
  return get(CONFIG_API);
}
