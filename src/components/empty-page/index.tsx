import React from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

import { CompanyName } from '@components/company-name';
import Button from '@components/button';

import styles from './empty-page.module.scss';

interface IEmptyPageProps {
  onNext?: () => void;
  image: string;
  title: string;
  description: string;
}

export const EmptyPage: React.FC<IEmptyPageProps> = ({
  onNext = null, image, title, description,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <CompanyName classNames={styles.companyName} />
      <div className={styles.content}>
        <img
          className={styles.img}
          src={image}
          alt="girl"
        />
        <p className={cn(styles.text, styles.title)}>{title}</p>
        <p className={cn(styles.text, styles.description)}>{description}</p>
        {onNext && <Button onClick={onNext} className={styles.submit} isFluid type="white">{t('EMPTY_SCREENS.SUBMIT')}</Button>}
      </div>
    </div>
  );
};
