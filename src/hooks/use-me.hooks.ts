import { getMeAPI } from '@api/user.service';
import useSWR from 'swr';
import { ME_API } from '@constants/api.constants';

export const useMe = (): [number, boolean] => {
  const { data, error } = useSWR(
    [ME_API], () => getMeAPI(),
  );
  const isLoading = !error && !data;
  return [data?.user?.id || 0, isLoading];
};
