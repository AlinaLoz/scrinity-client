import React from 'react';
import { useTranslation } from 'next-i18next';
import { CompanyName } from '@components/company-name';
import { ERROR_PAGE_IMAGE_PATH } from '@constants/ui.constants';
import styles from './styles.module.scss';

export const OnlyMobileNotify: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <CompanyName classNames={styles.companyName} />
      <div className={styles.text}>
        <img
          className={styles.img}
          src={ERROR_PAGE_IMAGE_PATH}
          alt="girl"
        />
        <div className={styles.first}>{t('ONLY_MOBILE_NOTIFY.OUCH')}</div>
        <div className={styles.second}>{t('ONLY_MOBILE_NOTIFY.TEXT')}</div>
      </div>
    </div>
  );
};
