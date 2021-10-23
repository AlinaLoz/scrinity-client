import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
// import { FileUpload } from 'use-file-upload';

import { FormHeader } from '@containers/feedback/components/header';
import {
  FEEDBACK_ISSUE, MIN_LENGTH_COMMENT, NEGATIVE_FEEDBACK_ISSUES, POSITIVE_FEEDBACK_ISSUES,
} from '@constants/feedback.constants';
import Button from '@components/button';
import { UploadButton } from '@components/upload-button';
import { CloseIcon } from '@components/icons/close';
import { TFile, useUploadFiles } from '@hooks/use-upload-files';

import styles from './form.module.scss';

interface IFormProps {
  onNext: (files: TFile[]) => void;
  onPrev: () => void;
  isGoodReview: boolean;
  isLoading: boolean;
}

export const Form: React.FC<IFormProps> = ({
  isLoading, onNext, onPrev, isGoodReview,
}) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState<FEEDBACK_ISSUE[]>([]);
  const options = isGoodReview ? POSITIVE_FEEDBACK_ISSUES : NEGATIVE_FEEDBACK_ISSUES;
  const [message, setMessage] = useState('');
  const [files, selectFiles, deleteFile] = useUploadFiles();

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
        <div>
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
                onClick={() => handleOptionPress(option)}
              >
                {t(`Form.${option}`)}
              </div>
            ))}
            <div className={styles.message}>
              <textarea
                name="message"
                value={message}
                className={styles.textarea}
                placeholder={t('Form.message')}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className={styles.messageLength}>
                <span>{message.length}</span><span>/</span><span>{MIN_LENGTH_COMMENT}</span>
              </div>
            </div>
          </div>
          <div className={cn(styles.row, { [styles.uploaded]: files.length })}>
            {!files.length ? null : (
              files.slice(0, 4).map((file, index) => (
                <div key={file.file?.name} className={styles.preview}>
                  <CloseIcon className={styles.close} onClick={() => deleteFile(index)} />
                  <img src={file.source} alt="preview" />
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles.row}>
          <UploadButton
            onLoadPhoto={selectFiles}
            className={styles.uploadButton}
          />
          <Button
            disabled={message.length < MIN_LENGTH_COMMENT || !selectedOptions.length}
            isLoading={isLoading}
            isFluid
            type="blue"
            onClick={() => onNext(files)}
          >
            {t('Form.sendFeedback')}
          </Button>
        </div>
      </div>
    </div>
  );
};
