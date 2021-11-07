import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss';

export const OnlyMobileNotify: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <div className={styles.first}>{t('ONLY_MOBILE_NOTIFY.OUCH')}</div>
      <div className={styles.second}>{t('ONLY_MOBILE_NOTIFY.TEXT')}</div>
    </div>
  );
};
