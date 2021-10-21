import React from 'react';
import { useTranslation } from 'next-i18next';

import { ICompany } from '@interfaces/companies.interfaces';
import Button from '@components/button';
import { CompanyName } from '@components/company-name';
import { UrlHelper } from '@helpers/url.helper';
import { PROJECT_NAME } from '@constants/global.constants';
import { GIRL_WITH_LAPTOP_IMAGE_PATH } from '@constants/ui.constants';

import { GirlWithLaptop } from '@components/icons/girl-with-laptop';
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
        <div className={styles.popup}>
          {/* <img */}
          {/*  className={styles.girlWithLaptop} */}
          {/*  src={GIRL_WITH_LAPTOP_IMAGE_PATH} */}
          {/*  alt="girl" */}
          {/* /> */}
          {/* <GirlWithLaptop className={styles.girlWithLaptop} /> */}
          <picture className={styles.companyInfo}>
            <img className={styles.companyImage} src={UrlHelper.getImageSrc('puma.png')} alt={`company ${company.id}`} />
            <div className={styles.companyTitles}>
              <p className={styles.name}>{company.name}</p>
              <p className={styles.managerTitle}>{t('Welcome.manager')}</p>
            </div>
          </picture>
          <div className={styles.comment}>
            <p>{t('Welcome.comment')}</p>
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
          <CompanyName classNames={styles.companyName} />
        </div>
      </div>
    </div>
  );
};
