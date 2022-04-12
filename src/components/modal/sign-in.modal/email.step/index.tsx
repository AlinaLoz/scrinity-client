import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { ModalContext, TModalData } from '@contexts/modal.context';
import { UrlHelper } from '@helpers/url.helper';
import Button from '@components/button';
import { Touchable } from '@components/touchable';
import { MODAL } from '@constants/modal.constants';
import { CompanyName } from '@components/company-name';
import { Input } from '@components/input/simple';
import { useConfig } from '@hooks/use-config.hooks';
import { validateEmail } from '@constants/auth.constants';
import { getFirstResponseError } from '@helpers/message.helper';

import { POLICY } from '@constants/files.constants';
import styles from './email.module.scss';

export const EmailStep: React.FC = () => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [, config] = useConfig();
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const formType = (config?.CHAT_LINK_CHANNEL || '').toUpperCase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setModalType } = useContext(ModalContext);

  const onChangeInput = useCallback((value: string) => {
    setEmail(value);
    setIsInvalidEmail(!validateEmail(value));
  }, []);

  if (!data) {
    return null;
  }

  const onNextStepWrapper = async () => {
    try {
      setIsLoading(true);
      if (data?.cb) {
        await data?.cb(email);
      }
      setModalType(MODAL.NONE);
    } catch (err) {
      setError(getFirstResponseError(err));
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.companyImage}>
        <img src={UrlHelper.getStaticFile(data.institution.company.image.filename)} alt={data.institution.id} />
      </div>
      <p className={styles.description}>
        {t(`${formType}_SIGN_IN_REQUEST.DESCRIPTION`)}
      </p>
      <Input
        autoCapitalize="off"
        autoComplete="on"
        placeholder="scrinity@gmail.com"
        value={email}
        onChangeValue={onChangeInput}
        autoFocus
      />
      <Button
        disabled={!email.length || isInvalidEmail}
        className={styles.button}
        onClick={onNextStepWrapper}
        type="blue"
        isLoading={isLoading}
      >{t(`${formType}_SIGN_IN_REQUEST.SUBMIT`)}
      </Button>
      {error && <p className={styles.error}>{t(`ERRORS.${error}`)}</p>}
      <p className={styles.warning}>
        {t(`${formType}_SIGN_IN_REQUEST.WARNING`)}
        <a
          target="_blank"
          rel="noreferrer nofollow noopener"
          href={UrlHelper.getStaticFile(POLICY)}
          className={styles.alink}
        >
          {t(`${formType}_SIGN_IN_REQUEST.POLICY`)}
        </a>
      </p>
      <Touchable className={styles.link} onClick={onNextStepWrapper}>{t(`${formType}_SIGN_IN_REQUEST.LINK`)}</Touchable>
      <CompanyName classNames={styles.companyName} />
    </div>
  );
};
