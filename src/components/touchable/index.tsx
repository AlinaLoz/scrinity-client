import React from 'react';
import cn from 'classnames';
import styles from './touchable.module.scss';

interface ITouchableProps {
  onClick: () => void;
  className?: string;
}

export const Touchable: React.FC<ITouchableProps> = ({ className = '', children, onClick }) => (
  <div
    className={cn(styles.touchable, className)}
    onClick={onClick}
    role="button"
    onKeyPress={onClick}
    tabIndex={-1}
  >
    {children}
  </div>
);
