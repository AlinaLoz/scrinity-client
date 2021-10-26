import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';

import styles from './sign-in.module.scss';
import { SIGN_IN_STEP } from '../modal.contsants';
import { RequestCodeStep } from './request-code.step';
import { VerifyCodeStep } from './verify-code.step';

export const SignInModal: React.FC = () => {
  const [stepSignIn, setStepSignIn] = useState(SIGN_IN_STEP.REQUEST);
  const [phone, setPhone] = useState('');

  const onNextToVerifyCode = useCallback((phoneNumber: string) => {
    setPhone(phoneNumber);
    setStepSignIn(SIGN_IN_STEP.VERIFY);
  }, []);

  const render = () => {
    switch (stepSignIn) {
      case SIGN_IN_STEP.REQUEST:
        return <RequestCodeStep onNext={onNextToVerifyCode} />;
      default:
        return <VerifyCodeStep phone={phone} />;
    }
  };

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      className={styles.modal}
    >
      {render()}
    </Modal>
  );
};
