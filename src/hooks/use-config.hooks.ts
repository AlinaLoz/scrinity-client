import useSWR from 'swr';
import { useEffect } from 'react';

import { CONFIG_API } from '@constants/api.constants';
import { getConfig } from '@api/config.service';
import { IGetConfigAPIResponse, LINK_CHANNEL } from '@interfaces/config.interfaces';
import { deleteAllCookies } from '@helpers/cookies.helpers';

export const useConfig = (): [boolean, IGetConfigAPIResponse | null] => {
  const { data, error } = useSWR(
    [CONFIG_API],
    () => getConfig(),
  );

  useEffect(() => {
    if (data?.CHAT_LINK_CHANNEL && data.CHAT_LINK_CHANNEL === LINK_CHANNEL.EMAIL) {
      deleteAllCookies();
    }
  }, [data]);

  const isLoading = !error && !data;
  return [isLoading, data || null];
};
