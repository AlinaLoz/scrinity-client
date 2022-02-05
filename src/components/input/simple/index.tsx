import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './simple.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  value: string;
  onChangeValue: (value: string) => void;
  type?: 'white' | '',
  icon?: JSX.Element | null,
}

export const Input: React.FC<IInputProps> = ({
  placeholder, type, icon,
  value, onChangeValue, className = '', ...props
}) => (
  <div className={cn({ [styles.withIcon]: !!icon })}>
    {icon}
    <input
      {...props}
      placeholder={placeholder}
      type="text"
      className={cn(className, styles.input, styles[type || ''])}
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  </div>
);
