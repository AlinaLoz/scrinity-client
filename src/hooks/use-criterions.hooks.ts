import useSWR from 'swr';

import { CRITERIONS_API } from '@constants/api.constants';
import { getCriterions } from '@api/config.service';

export const userCriterions = (): [boolean, Record<string, string>] => {
  const { data, error } = useSWR(
    [CRITERIONS_API],
    () => getCriterions(),
  );

  const isLoading = !error && !data;
  return [isLoading, data || {}];
};
