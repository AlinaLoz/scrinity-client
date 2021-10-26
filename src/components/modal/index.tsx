import React, { useContext } from 'react';

import { MODAL } from '@constants/modal.constants';
import { ModalContext } from '@contexts/modal.context';

import { SignInModal } from './sign-in.modal';

export const Modal: React.FC = () => {
  const { modalType } = useContext(ModalContext);
  if (modalType === MODAL.SIGN_IN) {
    return <SignInModal />;
  }
  return null;
};
