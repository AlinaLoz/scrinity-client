import React, { useCallback, useContext, useState } from 'react';
import { ModalContext, TModalData } from '@contexts/modal.context';

import { UrlHelper } from '@helpers/url.helper';
import { PhoneNumberInput } from '@components/input/phonenumber';
import Button from '@components/button';
import { Touchable } from '@components/touchable';
import { MODAL } from '@constants/modal.constants';
import { CompanyName } from '@components/company-name';
import { useTranslation } from 'next-i18next';
import { useRequestNewCode } from '@components/modal/sign-in.modal/sign-in.hooks';
import styles from './request-code.module.scss';

interface IRequestCodeStep {
  onNext: (phone: string) => void;
}

export const RequestCodeStep: React.FC<IRequestCodeStep> = ({ onNext }) => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const { t } = useTranslation('common');
  const [phone, setPhone] = useState('');

  const [isLoading, error, setError, requestConfirmCode] = useRequestNewCode();

  const onNextStepWrapper = useCallback(async () => {
    const cb = (): void => onNext(phone);
    await requestConfirmCode(phone, cb);
  }, [phone]);

  const setPhoneWrapper = useCallback((value: string) => {
    setPhone(value);
    setError('');
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.companyImage}>
        <img src={UrlHelper.getImageSrc(data.institution.company.image.filename)} alt={data.institution.id} />
      </div>
      <p className={styles.description}>
        {t('SIGN_IN_REQUEST.DESCRIPTION')}
      </p>
      <PhoneNumberInput value={phone} className={styles.input} onChange={setPhoneWrapper} />
      <Button
        disabled={!phone || phone?.length < 13}
        className={styles.button}
        onClick={onNextStepWrapper}
        type="blue"
        isLoading={isLoading}
      >{t('SIGN_IN_REQUEST.SUBMIT')}
      </Button>
      {error && <p className={styles.error}>{t(`ERRORS.${error}`)}</p>}
      <p className={styles.warning}>
        {t('SIGN_IN_REQUEST.WARNING')}
      </p>
      {data.onSendFeedback && (
        <Touchable className={styles.link} onClick={data.onSendFeedback}>{t('SIGN_IN_REQUEST.LINK')}</Touchable>
      )}
      <CompanyName classNames={styles.companyName} />
    </div>
  );
};
