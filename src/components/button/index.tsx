import React from 'react';
import cn from 'classnames';
import Loader from '../loader';
import styles from './button.module.scss';

interface IButtonProps {
  isFluid?: boolean,
  onClick?: () => void,
  isLoading?: boolean,
  disabled?: boolean,
  className?: string,
  type?: 'blue' | 'white',
  // size?: 's'|'m'|'l',
}

const Button: React.FC<IButtonProps> = ({
  children = null,
  isFluid = false,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'white',
  ...props
}) => (
  <button
    {...props}
    onClick={onClick}
    disabled={disabled || isLoading}
    className={cn(
      className,
      styles[type],
      { [styles.fluid]: isFluid },
      { [styles.loading]: !isLoading },
    )}
  >
    {isLoading ? <Loader className={styles.loader} /> : (
      <div className={styles.text}>
        {children}
      </div>
    )}
  </button>
);

export default Button;
