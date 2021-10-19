import React from 'react';
import { useTranslation } from 'next-i18next';

import { ICompany } from '@interfaces/companies.interfaces';
import config from '@utils/config';
import Button from '@components/button';
import styles from './welcome.module.scss';
import { UrlHelper } from '../../../helpers/url.helper';

interface IWelcomeProps {
  onNext: (data: boolean) => void;
  company: ICompany,
}

export const Welcome: React.FC<IWelcomeProps> = ({ onNext, company }) => {
  const { t } = useTranslation('common');

  // todo возвращать с бэка company.filename с форматом
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.projectName}>Project z</h1>
      <div className={styles.popup}>
        <picture className={styles.companyInfo}>
          <img className={styles.companyImage} src={UrlHelper.getImageSrc('puma.png')} alt={`company ${company.id}`} />
          <div className={styles.companyTitles}>
            <p className={styles.name}>{company.name}</p>
            <p className={styles.managerTitle}>{company.managerTitle}</p>
          </div>
        </picture>
        <div className={styles.comment}>
          Если у вас есть претензии или пожелания относительно  качества товаров или услуг, просим оставить отзыв. Все сообщения будут переданы руководству.
        </div>
        <Button onClick={() => onNext(true)}>
          {t('Welcome.btnGoodReview')}
        </Button>
        <Button onClick={() => onNext(false)}>
          {t('Welcome.btnBadReview')}
        </Button>
      </div>
    </div>
  );
};
