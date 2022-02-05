import React, { useContext } from 'react';

import { MODAL } from '@constants/modal.constants';
import { ModalContext } from '@contexts/modal.context';

import { FeedbackModal } from '@components/modal/feedback.modal';
import { useDisableBodyScroll } from '@hooks/use-body-scroll.hooks';
import { SignInModal } from './sign-in.modal';

export const Modal: React.FC = () => {
  const { modalType } = useContext(ModalContext);
  useDisableBodyScroll(modalType !== MODAL.NONE);

  if (modalType === MODAL.SIGN_IN) {
    return <SignInModal />;
  }
  if (modalType === MODAL.FEEDBACK) {
    return <FeedbackModal />;
  }
  return null;
};
