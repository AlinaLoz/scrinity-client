import Modal from 'react-modal';
import emailjs from '@emailjs/browser';
import config from '@utils/config';
import cn from 'classnames';

import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { MODAL } from '@constants/modal.constants';
import { ModalContext } from '@contexts/modal.context';
import { PhoneNumberInput } from '@components/input/phonenumber';
import { BY_NUMBER_CODE_PLUS, NUMBER_LENGTH, validateEmail } from '@constants/auth.constants';
import Button from '@components/button';
import { Input } from '@components/input/simple';
import { PersonIcon } from '@components/icons/person';
import { EmailIcon } from '@components/icons/email';
import { FeedbackPhoneIcon } from '@components/icons/feedback-phone';
import { UrlHelper } from '@helpers/url.helper';
import { TERMS_OF_USE } from '@constants/files.constants';
import styles from './feedback.module.scss';

const TermsOfUse = () => (
  <a
    target="_blank"
    rel="noreferrer nofollow noopener"
    href={UrlHelper.getStaticFile(TERMS_OF_USE)}
    className={styles.alink}
  >
    с пользовательским соглашением
  </a>
);

export const FeedbackModal: React.FC = () => {
  const { setData } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState(BY_NUMBER_CODE_PLUS);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  useEffect(() => {
    setError('');
  }, [email, name, phone]);

  const onChangeInput = useCallback((value: string) => {
    setEmail(value);
    setIsInvalidEmail(!validateEmail(value));
  }, []);

  const onRequestCloseWrapper = useCallback(() => {
    setData(MODAL.NONE, null);
  }, []);
  const isDisable = !name || ((!phone || phone?.length < NUMBER_LENGTH) && (!email || isInvalidEmail));

  const onSendForm = async () => {
    const params = { phone, name, email };
    try {
      setIsLoading(true);
      await emailjs.send(config.EMAIL_JS.SERVICE_ID, config.EMAIL_JS.TEMPLATE, params, config.EMAIL_JS.USER_ID);
      setData(MODAL.NONE, null);
    } catch (err) {
      setError('Ошибка отправки формы');
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      onRequestClose={onRequestCloseWrapper}
      className={styles.modal}
    >
      <p className={styles.title}>Заполните форму для связи с нами</p>
      <Input
        className={styles.input}
        icon={<PersonIcon />}
        type="white"
        placeholder="Имя"
        value={name}
        onChangeValue={setName}
      />
      <Input
        className={styles.input}
        icon={<EmailIcon />}
        type="white"
        placeholder="Email"
        value={email}
        onChangeValue={onChangeInput}
      />
      <PhoneNumberInput
        icon={<FeedbackPhoneIcon />}
        type="white"
        value={phone}
        placeholder="+375 (00) 000 00 00"
        onChange={setPhone}
        className={cn(styles.input)}
        wrapperClassName={styles.phoneInput}
      />
      <Button
        disabled={isDisable}
        className={styles.button}
        onClick={onSendForm}
        type="blue"
        isLoading={isLoading}
      >Отправить
      </Button>
      {error && <div className={styles.error}>{error}</div>}
      <p className={styles.policy}>Нажимая кнопку, Вы даете согласие на
        обработку персональных данных и соглашаетесь с <TermsOfUse />
      </p>
    </Modal>
  );
};
