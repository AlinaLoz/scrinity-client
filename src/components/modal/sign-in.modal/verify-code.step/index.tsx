import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { useTranslation } from 'next-i18next';
import useCountDown from 'react-countdown-hook';
import cn from 'classnames';

import { ModalContext, TModalData } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { UrlHelper } from '@helpers/url.helper';
import Button from '@components/button';
import { Touchable } from '@components/touchable';
import { CompanyName } from '@components/company-name';
import { Input } from '@components/input/simple';
import { BackIcon } from '@components/icons/back';
import { verifyConfirmCode } from '@api/auth.service';
import { getFirstResponseError } from '@helpers/message.helper';
import { useRequestNewCode } from '@components/modal/sign-in.modal/sign-in.hooks';

import requestCodeStyle from '../request-code.step/request-code.module.scss';
import styles from './verify-code.module.scss';

interface IVerifyCodeStep {
  phone: string;
  onBack: () => void;
}

const initialTime = 5 * 1000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000
const CONFIRM_CODE_LENGTH = 6;

export const VerifyCodeStep: React.FC<IVerifyCodeStep> = ({
  phone, onBack,
}) => {
  const { data }: { data?: TModalData<MODAL.SIGN_IN> } = useContext(ModalContext);
  const { t } = useTranslation('common');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirmCode, errorRequestCode, , requestConfirmCode] = useRequestNewCode();

  const [timeLeft, { start, reset }] = useCountDown(initialTime, interval);

  useEffect(() => {
    start();
  }, []);

  const setCodeWrapper = useCallback((value: string) => {
    setCode(value);
    setError('');
  }, []);

  const onRequestNewCodeWrapper = async () => {
    setError('');
    await requestConfirmCode(phone, () => {
      reset();
      start();
    });
  };

  const onNextStepWrapper = async () => {
    try {
      setIsLoading(true);
      await verifyConfirmCode({ code, phoneNumber: phone });
      await data?.onSendFeedback();
    } catch (err) {
      setError(getFirstResponseError(err));
    }
    setIsLoading(false);
  };

  if (!data) {
    return null;
  }

  const isDisableButton = code.length < CONFIRM_CODE_LENGTH;

  return (
    <div className={requestCodeStyle.wrapper}>
      <BackIcon onClick={onBack} className={styles.backIcon} />
      <div className={requestCodeStyle.companyImage}>
        <img src={UrlHelper.getImageSrc('puma.png')} alt={`company ${data.company.id}`} />
      </div>
      <p className={requestCodeStyle.description}>
        {t('SIGN_IN_VERIFY.DESCRIPTION')}
      </p>
      <Input
        maxLength={6}
        placeholder="000000"
        value={code}
        onChangeValue={setCodeWrapper}
      />
      <Button
        disabled={isDisableButton}
        className={requestCodeStyle.button}
        onClick={onNextStepWrapper}
        type="blue"
        isLoading={isLoading || isLoadingConfirmCode}
      >{t(
          timeLeft > 0 && code.length < CONFIRM_CODE_LENGTH
            ? 'SIGN_IN_VERIFY.REQUEST_CONFIRM_CODE' : 'SIGN_IN_VERIFY.SUBMIT',
          { seconds: timeLeft / 1000 },
        )}
      </Button>
      {error && <p className={requestCodeStyle.error}>{t(`ERRORS.${error || errorRequestCode}`)}</p>}
      {timeLeft === 0 && (
        <div className={styles.comment}>
          <p className={cn(requestCodeStyle.link, styles.question)}>{t('SIGN_IN_VERIFY.QUESTION')}</p>
          <Touchable className={requestCodeStyle.link} onClick={onRequestNewCodeWrapper}>{t('SIGN_IN_VERIFY.LINK')}</Touchable>
        </div>
      )}
      <CompanyName classNames={requestCodeStyle.companyName} />
    </div>
  );
};
