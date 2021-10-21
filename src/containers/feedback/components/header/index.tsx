import React from 'react';
import cn from 'classnames';

import { CompanyName } from '@components/company-name';
import { BackIcon } from '@components/icons/back';
import styles from './header.module.scss';

interface IFormHeaderProps {
  onBack: () => void;
  className?: string;
}
export const FormHeader: React.FC<IFormHeaderProps> = ({ onBack, className }) => (
  <div className={cn(styles.formHeader, className)}>
    <BackIcon onClick={onBack} className={styles.backIcon} />
    <CompanyName classNames={styles.companyName} />
  </div>
);
