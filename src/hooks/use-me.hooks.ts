import useSWR, { mutate } from 'swr';
import { useContext, useEffect } from 'react';

import { getMeAPI } from '@api/user.service';
import { ME_API } from '@constants/api.constants';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useInstitution } from '@hooks/use-institution.hooks';

export const useMe = (props: {
  openModal: boolean,
  swrToken?: string | Array<string | number>,
} = { swrToken: '', openModal: false }): [number, boolean] => {
  const { setData, modalType } = useContext(ModalContext);
  const [, institution] = useInstitution();
  const { data, error } = useSWR(
    [ME_API], () => getMeAPI(),
    { errorRetryCount: 0 },
  );
  const isLoading = !error && !data;

  useEffect(() => {
    if (props.openModal && !data?.user?.id && !isLoading
      && modalType !== MODAL.SIGN_IN && institution
    ) {
      setData(MODAL.SIGN_IN, {
        institution,
        cb: async () => {
          await mutate(props.swrToken);
        },
      });
    }
  }, [data?.user?.id, props.swrToken, props.openModal, isLoading, modalType]);

  return [data?.user?.id || 0, isLoading];
};
