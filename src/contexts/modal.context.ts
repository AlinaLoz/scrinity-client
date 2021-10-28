/* eslint-disable */
import { createContext } from 'react';

import { MODAL } from '@constants/modal.constants';
import { ICompany } from '@interfaces/companies.interfaces';

export type TModalData<T extends MODAL> = {
  [MODAL.SIGN_IN]: {
    company: ICompany,
    onSendFeedback: () => Promise<void>;
  } | null,
  [MODAL.NONE]: null,
}[T];

export type TContext<T extends MODAL> = {
  modalType: T,
  setModalType: (type: T) => void,
  setData: (type: T, data: TModalData<T>) => void,
  data?: TModalData<MODAL>,
};

export const ModalContext = createContext<TContext<MODAL>>({
  modalType: MODAL.SIGN_IN,
  setModalType: (type: MODAL) => {},
  setData<T extends MODAL>(type: T, data: TModalData<T>) {},
  data: null,
});
