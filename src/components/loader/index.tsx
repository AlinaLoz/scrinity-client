import React, { memo } from 'react';
import cn from 'classnames';

import styles from './loader.module.scss';

interface ILoader {
  // size: 's' | 'm' | 'l',
  // color?: 'white' | 'blue',
  className?: string,
}
const Loader: React.FC<ILoader> = ({
  // size = 's',
  // color = 'white',
  className = '',
}) => (
  <div className={cn(styles.dots, className)}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);

export default memo(Loader);
