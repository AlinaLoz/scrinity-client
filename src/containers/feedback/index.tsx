import React, { useCallback, useContext, useState } from 'react';

import { IInstitution, ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useSendFeedback } from '@containers/feedback/use-feedback.hooks';
import { TFile } from '@hooks/use-upload-files';

import { useMe } from '@hooks/use-me.hooks';
import { useConfig } from '@hooks/use-config.hooks';
import { LINK_CHANNEL } from '@interfaces/config.interfaces';
import { Welcome } from './welcome';
import { REVIEW_STEP } from './review.constants';
import { Form } from './form';
import { Success } from './success';
import { Error } from './error';

interface IReviewProps {
  institution: IInstitution;
}

export const Feedback: React.FC<IReviewProps> = ({ institution }) => {
  const [reviewStep, setReviewStep] = useState<number>(REVIEW_STEP.ERROR);
  const [isLoading, error, setError, sendFeedback] = useSendFeedback();
  const { setData } = useContext(ModalContext);
  const [userId] = useMe();
  const [, config] = useConfig();

  const onNext = useCallback(() => {
    setReviewStep((prev) => prev + 1);
  }, []);
  const onPrev = useCallback(() => {
    setReviewStep((prev) => prev - 1);
  }, []);

  const [issGoodReview, setIsGoodReview] = useState<boolean>(false);
  const onNextWelcomePress = useCallback((isGood: boolean) => {
    setIsGoodReview(isGood);
    onNext();
  }, []);

  const onNextFormPress = useCallback((data: ISendFeedbackRequest & { files: TFile[] }) => {
    const onSendFeedback = async (email?: string) => {
      setData(MODAL.NONE, null);
      if (await sendFeedback({ ...data, email })) {
        setReviewStep(REVIEW_STEP.SUCCESS);
      }
    };
    (async () => {
      if (!userId || config?.CHAT_LINK_CHANNEL === LINK_CHANNEL.EMAIL) {
        setData(MODAL.SIGN_IN, { institution, cb: onSendFeedback });
      } else {
        await onSendFeedback();
      }
    })();
  }, [userId, config]);

  switch (reviewStep) {
    case REVIEW_STEP.WELCOME:
      return <Welcome onNext={onNextWelcomePress} institution={institution} />;
    case REVIEW_STEP.FORM:
      return (
        <Form
          error={error}
          setError={setError}
          institution={institution}
          isLoading={isLoading}
          onSubmitFormPress={onNextFormPress}
          onPrev={onPrev}
          isGoodReview={issGoodReview}
        />
      );
    case REVIEW_STEP.SUCCESS:
      return <Success onNext={() => setReviewStep(REVIEW_STEP.WELCOME)} />;
    default:
      return <Error onNext={() => setReviewStep(REVIEW_STEP.WELCOME)} />;
  }
};
