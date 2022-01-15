import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { INSTITUTION_API } from '@constants/api.constants';
import { getInstitutionAPI } from '@api/companies.service';
import { IInstitution } from '@interfaces/companies.interfaces';
import { useDataFromQuery } from './query.hooks';

export const use404 = (error: { response?: { status?: number }}) => {
  const router = useRouter();

  useEffect(() => {
    if (error && error.response?.status === 404) {
      router.push('/404');
    }
  }, [error]);
};

export const useInstitution = (): [boolean, IInstitution | null] => {
  const parsedQuery = useDataFromQuery();

  const { data, error } = useSWR(
    [INSTITUTION_API, parsedQuery.institutionId],
    () => (!parsedQuery.institutionId ? null : getInstitutionAPI(parsedQuery.institutionId)),
  );
  use404(error);
  const isLoading = !error && !data;
  return [isLoading, data || null];
};
