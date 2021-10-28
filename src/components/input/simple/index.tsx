import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './simple.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export const Input: React.FC<IInputProps> = ({
  placeholder,
  value, onChangeValue, className = '', ...props
}) => (
  <input
    {...props}
    placeholder={placeholder}
    type="text"
    className={cn(className, styles.input)}
    value={value}
    onChange={(e) => onChangeValue(e.target.value)}
  />
);
