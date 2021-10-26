import React, { useCallback, useContext, useState } from 'react';
import { ICompany } from '@interfaces/companies.interfaces';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useSendFeedback } from '@containers/feedback/use-feedback.hooks';
import { TFile } from '@hooks/use-upload-files';
import { Welcome } from './welcome';
import { REVIEW_STEP } from './review.constants';
import { Form } from './form';
import { Success } from './success';
import { ReviewError } from './error';

interface IReviewProps {
  company: ICompany;
}

export const Feedback: React.FC<IReviewProps> = ({ company }) => {
  const [reviewStep, setReviewStep] = useState<number>(REVIEW_STEP.FORM);
  const [isLoading, onSendFeedback] = useSendFeedback();
  const { setData } = useContext(ModalContext);

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

  const sendNoAuthFeedback = () => {
    alert('отправка неавторизированного фидбэка');
  };

  const onNextFormPress = useCallback(async (files: TFile[]) => {
    await onSendFeedback(files);
    setData(MODAL.SIGN_IN, { company, onNext: sendNoAuthFeedback });
  }, []);

  // const onNextPhoneNumberPress = useCallback(() => {
  //   onNext();
  // }, []);
  // const onNextCodePress = useCallback(() => {
  //   onNext();
  // }, []);

  switch (reviewStep) {
    case REVIEW_STEP.WELCOME:
      return <Welcome onNext={onNextWelcomePress} company={company} />;
    case REVIEW_STEP.FORM:
      return (
        <Form
          isLoading={isLoading}
          onNext={onNextFormPress}
          onPrev={onPrev}
          isGoodReview={issGoodReview}
        />
      );
    // case REVIEW_STEP.PHONE_NUMBER:
    //   return <PhoneNumber onNext={onNextPhoneNumberPress} onPrev={onPrev} />;
    // case REVIEW_STEP.CODE:
    //   return <Code onNext={onNextCodePress} onPrev={onPrev} />;
    case REVIEW_STEP.SUCCESS:
      return <Success />;
    default:
      return <ReviewError />;
  }
};
