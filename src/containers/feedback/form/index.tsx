import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { FormHeader } from '@containers/feedback/components/header';

import { FEEDBACK_ISSUE, NEGATIVE_FEEDBACK_ISSUES, POSITIVE_FEEDBACK_ISSUES } from '@constants/feedback.constants';
import Button from '@components/button';
import styles from './form.module.scss';

interface IFormProps {
  onNext: () => void;
  onPrev: () => void;
  isGoodReview: boolean;
}

export const Form: React.FC<IFormProps> = ({ onNext, onPrev, isGoodReview }) => {
  const { t } = useTranslation('common');
  const [selectedOptions, setSelectedOptions] = useState<FEEDBACK_ISSUE[]>([]);
  const options = isGoodReview ? POSITIVE_FEEDBACK_ISSUES : NEGATIVE_FEEDBACK_ISSUES;
  const [message, setMessage] = useState('');

  const handleOptionPress = (selectedOption: FEEDBACK_ISSUE) => {
    if (selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions.filter((option) => option !== selectedOption)]);
    } else {
      selectedOptions.push(selectedOption);
      setSelectedOptions([...selectedOptions]);
    }
  };

  return (
    <div className={styles.content}>
      <FormHeader onBack={onPrev} className={styles.header} />
      <div className={styles.form}>
        <div className={styles.text}>
          <p className={styles.title}>{t('Form.title')}</p>
          <p className={styles.description}>{t('Form.description')}</p>
        </div>
        <div className={styles.options}>
          {options.map((option) => (
            <div
              role="button"
              key={option}
              tabIndex={0}
              className={cn(styles.feedbackOption, { [styles.selected]: selectedOptions.includes(option) })}
              onKeyPress={() => handleOptionPress(option)}
            >
              {t(`Form.${option}`)}
            </div>
          ))}
          <textarea
            name="message"
            value={message}
            className={styles.textarea}
            placeholder={t('Form.message')}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button
          isFluid
          type="blue"
          onClick={() => onNext()}
        >
          {t('Form.sendFeedback')}
        </Button>
      </div>
    </div>
  );
};
