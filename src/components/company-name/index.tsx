import React from 'react';
import { PROJECT_NAME } from '@constants/global.constants';
import styles from './company-name.module.scss';

export const CompanyName: React.FC = () => (
  <div className={styles.companyName}>
    {PROJECT_NAME}
  </div>
);
