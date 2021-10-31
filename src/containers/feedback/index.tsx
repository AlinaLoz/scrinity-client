import React, { useCallback, useContext, useState } from 'react';

import { ICompany, ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import { ModalContext } from '@contexts/modal.context';
import { MODAL } from '@constants/modal.constants';
import { useSendFeedback } from '@containers/feedback/use-feedback.hooks';
import { TFile } from '@hooks/use-upload-files';

import { Welcome } from './welcome';
import { REVIEW_STEP } from './review.constants';
import { Form } from './form';
import { Success } from './success';
import { Error } from './error';

interface IReviewProps {
  company: ICompany;
}

export const Feedback: React.FC<IReviewProps> = ({ company }) => {
  const [reviewStep, setReviewStep] = useState<number>(REVIEW_STEP.WELCOME);
  const [isLoading, error, sendFeedback] = useSendFeedback();
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

  const onNextFormPress = useCallback((data: ISendFeedbackRequest & { files: TFile[] }) => {
    const onSendFeedback = async () => {
      setData(MODAL.NONE, null);
      if (await sendFeedback(data)) {
        setReviewStep(REVIEW_STEP.SUCCESS);
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
          error={error}
          company={company}
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
