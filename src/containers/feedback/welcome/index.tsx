import React from 'react';
import { useTranslation } from 'next-i18next';

import { ICompany } from '@interfaces/companies.interfaces';
import styles from './welcome.module.scss';

interface IWelcomeProps {
  onNext: (data: boolean) => void;
  company: ICompany,
}

export const Welcome: React.FC<IWelcomeProps> = ({ onNext, company }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.projectName}>Project z</h1>
      <div className={styles.popup}>
        <div className={styles.company}>
          <img src="" alt={`company ${company.id}`} />
          <div>
            <p>{company.name}</p>
            <p>{company.managerTitle}</p>
          </div>
        </div>
        <button onClick={() => onNext(true)}>{t('Welcome.btnGoodReview')}</button>
        <button onClick={() => onNext(false)}>{t('Welcome.btnBadReview')}</button>
      </div>
    </div>
  );
};
