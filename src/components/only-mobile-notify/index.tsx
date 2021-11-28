import React from 'react';
import { useTranslation } from 'next-i18next';
import { CompanyName } from '@components/company-name';
import styles from './styles.module.scss';

export const OnlyMobileNotify: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <CompanyName classNames={styles.companyName} />
      <div className={styles.text}>
        <div className={styles.first}>{t('ONLY_MOBILE_NOTIFY.OUCH')}</div>
        <div className={styles.second}>{t('ONLY_MOBILE_NOTIFY.TEXT')}</div>
      </div>
    </div>
  );
};
