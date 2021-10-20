import React from 'react';
import { useTranslation } from 'next-i18next';

import { ICompany } from '@interfaces/companies.interfaces';
import Button from '@components/button';
import { CompanyName } from '@components/company-name';
import { UrlHelper } from '@helpers/url.helper';
import { GirlWithLaptop } from '@components/icons/girl-with-laptop';
import { PROJECT_NAME } from '@constants/global.constants';

import styles from './welcome.module.scss';

interface IWelcomeProps {
  onNext: (data: boolean) => void;
  company: ICompany,
}

export const Welcome: React.FC<IWelcomeProps> = ({ onNext, company }) => {
  const { t } = useTranslation('common');

  // todo возвращать с бэка company.filename с форматом
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.projectName}>{PROJECT_NAME}</h1>
        <GirlWithLaptop className={styles.girlWithLaptop} />
        <div className={styles.popup}>
          <picture className={styles.companyInfo}>
            <img className={styles.companyImage} src={UrlHelper.getImageSrc('puma.png')} alt={`company ${company.id}`} />
            <div className={styles.companyTitles}>
              <p className={styles.name}>{company.name}</p>
              <p className={styles.managerTitle}>{t('Welcome.manager')}</p>
            </div>
          </picture>
          <div className={styles.comment}>
            {t('Welcome.comment')}
          </div>
          <div className={styles.buttons}>
            <Button
              isFluid
              type="blue"
              className={styles.firstBtn}
              onClick={() => onNext(true)}
            >
              {t('Welcome.btnGoodReview')}
            </Button>
            <Button
              isFluid
              type="white"
              onClick={() => onNext(false)}
            >
              {t('Welcome.btnBadReview')}
            </Button>
          </div>
          <CompanyName />
        </div>
      </div>
    </div>
  );
};
