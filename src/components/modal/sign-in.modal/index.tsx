import React, { useCallback, useContext, useState } from 'react';
import Modal from 'react-modal';

import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useConfig } from '@hooks/use-config.hooks';
import { LINK_CHANNEL } from '@interfaces/config.interfaces';
import { EmailStep } from '@components/modal/sign-in.modal/email.step';
import styles from './sign-in.module.scss';
import { SIGN_IN_STEP } from '../modal.contsants';
import { RequestCodeStep } from './request-code.step';
import { VerifyCodeStep } from './verify-code.step';

export const SignInModal: React.FC = () => {
  const [stepSignIn, setStepSignIn] = useState(SIGN_IN_STEP.REQUEST);
  const [phone, setPhone] = useState('');
  const { setData } = useContext(ModalContext);
  const [, config] = useConfig();

  const onNextToVerifyCode = useCallback((phoneNumber: string) => {
    setPhone(phoneNumber);
    setStepSignIn(SIGN_IN_STEP.VERIFY);
  }, []);

  const onBackWrapper = useCallback(() => {
    setStepSignIn(SIGN_IN_STEP.REQUEST);
  }, []);

  // eslint-disable-next-line consistent-return
  const render = () => {
    if (!config?.CHAT_LINK_CHANNEL) {
      return null;
    }
    if (config.CHAT_LINK_CHANNEL === LINK_CHANNEL.SMS) {
      switch (stepSignIn) {
        case SIGN_IN_STEP.REQUEST:
          return <RequestCodeStep onNext={onNextToVerifyCode} />;
        default:
          return <VerifyCodeStep phone={phone} onBack={onBackWrapper} />;
      }
    }
    if (config.CHAT_LINK_CHANNEL === LINK_CHANNEL.EMAIL) {
      return <EmailStep />;
    }
  };

  const onRequestCloseWrapper = useCallback(() => {
    setData(MODAL.NONE, null);
  }, []);

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestCloseWrapper}
      className={styles.modal}
    >
      {render()}
    </Modal>
  );
};
