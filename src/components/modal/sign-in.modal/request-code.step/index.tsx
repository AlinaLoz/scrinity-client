import React, { useCallback, useContext, useState } from 'react';
import { ModalContext, TModalData } from '@contexts/modal.context';

import { UrlHelper } from '@helpers/url.helper';
import { PhoneNumberInput } from '@components/input/phonenumber';
import Button from '@components/button';
import { Touchable } from '@components/touchable';
import { MODAL } from '@constants/modal.constants';
import { CompanyName } from '@components/company-name';
import { requestConfirmCode } from '@api/auth.service';
import { getFirstResponseError } from '@helpers/message.helper';
import { useTranslation } from 'next-i18next';
import styles from './request-code.module.scss';

interface IRequestCodeStep {
  onNext: (phone: string) => void;
}

export const RequestCodeStep: React.FC<IRequestCodeStep> = ({ onNext }) => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const { t } = useTranslation('common');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onNextStepWrapper = async () => {
    try {
      setIsLoading(true);
      await requestConfirmCode(phone);
      onNext(phone);
    } catch (err) {
      setError(getFirstResponseError(err));
    }
    setIsLoading(false);
  };

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
        <img src={UrlHelper.getImageSrc('puma.png')} alt={`company ${data.company.id}`} />
      </div>
      <p className={styles.description}>
        Оставьте свой номер телефона, чтобы в случае необходимости мы могли с Вами связаться
      </p>
      <PhoneNumberInput className={styles.input} onChange={setPhoneWrapper} />
      <Button
        className={styles.button}
        onClick={onNextStepWrapper}
        type="blue"
        isLoading={isLoading}
      >Оставить номер
      </Button>
      {error && <p className={styles.error}>{t(`ERRORS.${error}`)}</p>}
      <p className={styles.warning}>
        Нажимая кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с политикой конфиденциальности
      </p>
      <Touchable className={styles.link} onClick={data.onNext}>Оставить отзыв без номера телефона</Touchable>
      <CompanyName classNames={styles.companyName} />
    </div>
  );
};
