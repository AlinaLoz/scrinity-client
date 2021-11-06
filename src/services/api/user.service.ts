import { get } from '@helpers/axios.helpers';
import { ME_API } from '@constants/api.constants';
import { IGetMeAPIResponse } from '@interfaces/user.interfaces';

export function getMeAPI(): Promise<IGetMeAPIResponse> {
  return get(ME_API);
}
