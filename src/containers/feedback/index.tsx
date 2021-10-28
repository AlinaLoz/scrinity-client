import React, { useCallback, useContext, useState } from 'react';

import { ICompany, ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useSendFeedback } from '@containers/feedback/use-feedback.hooks';

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
  const [isLoading, sendFeedback] = useSendFeedback();
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

  const onNextFormPress = useCallback((data: ISendFeedbackRequest) => {
    const onSendFeedback = async () => {
      try {
        setData(MODAL.NONE, null);
        await sendFeedback(data);
        setReviewStep(REVIEW_STEP.SUCCESS);
      } catch (err) {
        setReviewStep(REVIEW_STEP.ERROR);
      }
    };
    setData(MODAL.SIGN_IN, { company, onSendFeedback });
  }, []);

  switch (reviewStep) {
    case REVIEW_STEP.WELCOME:
      return <Welcome onNext={onNextWelcomePress} company={company} />;
    case REVIEW_STEP.FORM:
      return (
        <Form
          isLoading={isLoading}
          onSubmitFormPress={onNextFormPress}
          onPrev={onPrev}
          isGoodReview={issGoodReview}
        />
      );
    case REVIEW_STEP.SUCCESS:
      return <Success />;
    default:
      return <ReviewError />;
  }
};
