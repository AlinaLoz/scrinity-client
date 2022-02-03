import React from 'react';
import cn from 'classnames';

import { ArrowSliderIcon } from '@components/icons/arrow-slider';
import { ICON_SIZE_M } from '@constants/ui.constants';
import styles from './button.module.scss';

interface IProps {
  className?: string,
  direction: 'right' | 'left',
  onClick: (e?: any) => void,
}
const DirectionButton: React.FC<IProps> = React.memo(({ className, direction, ...props }) => (
  <div className={cn(className, styles.wrap)}>
    <button className={styles.btn} {...props}>
      {direction === 'right' && <ArrowSliderIcon className={styles.icon} size={ICON_SIZE_M} />}
      {direction === 'left' && <ArrowSliderIcon className={styles.icon} size={ICON_SIZE_M} />}
    </button>
  </div>
));

export default DirectionButton;
