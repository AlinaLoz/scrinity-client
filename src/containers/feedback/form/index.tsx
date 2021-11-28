import React, {
  Dispatch, SetStateAction, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { FormHeader } from '@containers/feedback/components/header';
import { MIN_LENGTH_COMMENT } from '@constants/feedback.constants';
import Button from '@components/button';
import { UploadButton } from '@components/upload-button';
import { CloseIcon } from '@components/icons/close';
import { TFile, useUploadFiles } from '@hooks/use-upload-files';

import { IInstitution, ISendFeedbackRequest } from '@interfaces/companies.interfaces';
import styles from './form.module.scss';

interface IFormProps {
  onSubmitFormPress: (data: ISendFeedbackRequest & { files: TFile[] }) => void;
  onPrev: () => void;
  isGoodReview: boolean;
  isLoading: boolean;
  institution: IInstitution,
  error: string;
  setError: Dispatch<SetStateAction<string>>,
}

export const Form: React.FC<IFormProps> = ({
  isLoading, onSubmitFormPress, onPrev, isGoodReview, institution,
  error, setError,
}) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const options = useMemo(() => institution.criterions
    .filter(({ isGood }) => isGood === isGoodReview)
    .map(({ key }) => key), [isGoodReview]);
  const [message, setMessage] = useState('');
  const [files, selectFiles, deleteFile] = useUploadFiles();

  const handleOptionPress = (selectedOption: string) => {
    if (selectedOptions.includes(selectedOption)) {
      setSelectedOptions([...selectedOptions.filter((option) => option !== selectedOption)]);
    } else {
      selectedOptions.push(selectedOption);
      setSelectedOptions([...selectedOptions]);
    }
  };

  useEffect(() => {
    setError('');
  }, [message, selectedOptions]);

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
                autoComplete="off"
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
            onClick={() => onSubmitFormPress({
              message,
              criterions: selectedOptions,
              isGood: isGoodReview,
              institutionId: institution.id,
              files,
            })}
          >
            {t('Form.sendFeedback')}
          </Button>
        </div>
        <div>
          {error && <p className={styles.error}>{t(`ERRORS.${error}`)}</p>}
        </div>
      </div>
    </div>
  );
};
