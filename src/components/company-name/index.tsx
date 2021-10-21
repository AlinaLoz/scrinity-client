import React from 'react';
import cn from 'classnames';
import { PROJECT_NAME } from '@constants/global.constants';
import styles from './company-name.module.scss';

interface ICompanyNameProps {
  classNames?: string;
}
export const CompanyName: React.FC<ICompanyNameProps> = ({ classNames }) => (
  <div className={cn(styles.companyName, classNames)}>
    {PROJECT_NAME}
  </div>
);
