import React, { useCallback, useState } from 'react';
import { ICompany } from '@interfaces/companies.interfaces';

// import { FileUpload } from 'use-file-upload';
import { useSendFeedback } from '@containers/feedback/use-feedback.hooks';
import { Welcome } from './welcome';
import { REVIEW_STEP } from './review.constants';
import { Form } from './form';
import { PhoneNumber } from './phone-number';
import { Code } from './code';
import { Success } from './success';
import { ReviewError } from './error';
import { TFile } from '@hooks/use-upload-files';

interface IReviewProps {
  company: ICompany;
}

export const Feedback: React.FC<IReviewProps> = ({ company }) => {
  const [reviewStep, setReviewStep] = useState<number>(REVIEW_STEP.FORM);
  const [isLoading, onSendFeedback] = useSendFeedback();

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

  const onNextFormPress = useCallback(async (files: TFile[]) => {
    await onSendFeedback(files);
    // onNext();
  }, []);
  const onNextPhoneNumberPress = useCallback(() => {
    onNext();
  }, []);
  const onNextCodePress = useCallback(() => {
    onNext();
  }, []);

  switch (reviewStep) {
    case REVIEW_STEP.WELCOME:
      return <Welcome onNext={onNextWelcomePress} company={company} />;
    case REVIEW_STEP.FORM:
      return <Form isLoading={isLoading} onNext={onNextFormPress} onPrev={onPrev} isGoodReview={issGoodReview} />;
    case REVIEW_STEP.PHONE_NUMBER:
      return <PhoneNumber onNext={onNextPhoneNumberPress} onPrev={onPrev} />;
    case REVIEW_STEP.CODE:
      return <Code onNext={onNextCodePress} onPrev={onPrev} />;
    case REVIEW_STEP.SUCCESS:
      return <Success />;
    default:
      return <ReviewError />;
  }
};
