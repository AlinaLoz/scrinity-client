import React, { MouseEvent } from 'react';
import cn from 'classnames';
// import Loader from '../loader';
import styles from './button.module.scss';

type Props = {
  isFluid?: boolean,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
  isRound?: boolean,
  disabled?: boolean,
  className?: string,
  type?: 'blue' | 'white',
  // size?: 's'|'m'|'l',
}

const Button: React.FC<Props> = ({
  children = null,
  isFluid = false,
  isRound = false,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = '',
  // size = 's',
  ...props
}) => (
  <button
    {...props}
    onClick={onClick}
    disabled={disabled || isLoading}
    className={cn(
      // styles[`size-${size}`],
      className,
      styles[type],
      { [styles.round]: isRound },
      { [styles.fluid]: isFluid },
      { [styles.loading]: isLoading },
    )}
  >
    {/* {isLoading && <Loader className={styles.loader} color={type === 'btnWhite' ? 'green' : 'white'} size={size} /> } */}
    <div className={styles.text}>
      {children}
    </div>
  </button>
);

export default Button;
