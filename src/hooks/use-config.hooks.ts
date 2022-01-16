import useSWR from 'swr';

import { CONFIG_API } from '@constants/api.constants';
import { getConfig } from '@api/config.service';
import { IGetConfigAPIResponse } from '@interfaces/config.interfaces';

export const useConfig = (): [boolean, IGetConfigAPIResponse | null] => {
  const { data, error } = useSWR(
    [CONFIG_API],
    () => getConfig(),
  );

  const isLoading = !error && !data;
  return [isLoading, data || null];
};
