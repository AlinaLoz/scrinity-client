import React from 'react';
import { useTranslation } from 'next-i18next';
import LazyLoad from 'react-lazyload';
import { IInstitution } from '@interfaces/companies.interfaces';
import Button from '@components/button';
import { CompanyName } from '@components/company-name';
import { UrlHelper } from '@helpers/url.helper';
import { PROJECT_NAME } from '@constants/global.constants';
import { GIRL_WITH_LAPTOP_IMAGE_PATH } from '@constants/ui.constants';
import styles from './welcome.module.scss';

interface IWelcomeProps {
  onNext: (data: boolean) => void;
  institution: IInstitution,
}

export const Welcome: React.FC<IWelcomeProps> = ({ onNext, institution }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.projectName}>{PROJECT_NAME}</h1>
        <div className={styles.popup}>
          <LazyLoad>
            <img
              className={styles.girlWithLaptop}
              src={GIRL_WITH_LAPTOP_IMAGE_PATH}
              alt="girl"
            />
          </LazyLoad>
          <picture className={styles.companyInfo}>
            <img
              className={styles.companyImage}
              src={UrlHelper.getStaticFile(institution?.company.image.filename)}
              alt={institution?.name}
            />
            <div className={styles.companyTitles}>
              <p className={styles.name}>{institution?.name}</p>
              <p className={styles.managerTitle}>{institution?.manager.roleTitle}</p>
            </div>
          </picture>
          <div className={styles.comment}>
            <p>{t('Welcome.comment')}</p>
          </div>
          <div className={styles.buttons}>
            <Button
              isFluid
              type="white"
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
