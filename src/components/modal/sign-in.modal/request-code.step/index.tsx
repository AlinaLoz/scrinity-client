import React, { useCallback, useContext, useState } from 'react';
import { ModalContext, TModalData } from '@contexts/modal.context';
import { useTranslation } from 'next-i18next';

import { UrlHelper } from '@helpers/url.helper';
import { PhoneNumberInput } from '@components/input/phonenumber';
import Button from '@components/button';
import { Touchable } from '@components/touchable';
import { MODAL } from '@constants/modal.constants';
import { CompanyName } from '@components/company-name';
import { useRequestNewCode } from '@components/modal/sign-in.modal/sign-in.hooks';
import { BY_NUMBER_CODE_PLUS, NUMBER_LENGTH } from '@constants/auth.constants';
import { POLICY } from '@constants/files.constants';
import styles from './request-code.module.scss';

interface IRequestCodeStep {
  onNext: (phone: string) => void;
}

export const RequestCodeStep: React.FC<IRequestCodeStep> = ({ onNext }) => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const { t } = useTranslation('common');
  const [phone, setPhone] = useState(BY_NUMBER_CODE_PLUS);

  const [isLoading, error,, requestConfirmCode] = useRequestNewCode();

  const onNextStepWrapper = useCallback(async () => {
    const cb = (): void => onNext(phone);
    await requestConfirmCode(phone, cb);
  }, [phone]);

  if (!data) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.companyImage}>
        <img src={UrlHelper.getStaticFile(data.institution.company.image.filename)} alt={data.institution.id} />
      </div>
      <p className={styles.description}>
        {t('SIGN_IN_REQUEST.DESCRIPTION')}
      </p>
      <PhoneNumberInput
        value={phone}
        onChange={setPhone}
        className={styles.input}
        autoFocus
      />
      <Button
        disabled={!phone || phone?.length < NUMBER_LENGTH}
        className={styles.button}
        onClick={onNextStepWrapper}
        type="blue"
        isLoading={isLoading}
      >{t('SIGN_IN_REQUEST.SUBMIT')}
      </Button>
      {error && <p className={styles.error}>{t(`ERRORS.${error}`)}</p>}
      <p className={styles.warning}>
        {t('SIGN_IN_REQUEST.WARNING')}
        <a
          target="_blank"
          rel="noreferrer nofollow noopener"
          href={UrlHelper.getStaticFile(POLICY)}
          className={styles.alink}
        >
          {t('SIGN_IN_REQUEST.POLICY')}
        </a>
      </p>
      {data.cb && (
        <Touchable className={styles.link} onClick={data.cb}>{t('SIGN_IN_REQUEST.LINK')}</Touchable>
      )}
      <CompanyName classNames={styles.companyName} />
    </div>
  );
};
