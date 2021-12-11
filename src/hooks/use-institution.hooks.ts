import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { INSTITUTION_API } from '@constants/api.constants';
import { getInstitutionAPI } from '@api/companies.service';
import { IInstitution } from '@interfaces/companies.interfaces';
import { useDataFromQuery } from './qury.hooks';

export const useInstitution = (): [boolean, IInstitution | null] => {
  const router = useRouter();
  const parsedQuery = useDataFromQuery();

  const { data, error } = useSWR(
    [INSTITUTION_API, parsedQuery.institutionId],
    () => (!parsedQuery.institutionId ? null : getInstitutionAPI(parsedQuery.institutionId)),
  );
  useEffect(() => {
    if (error && error.response?.status === 404) {
      router.push('/404');
    }
  }, [error]);

  const isLoading = !error && !data;
  return [isLoading, data || null];
};
