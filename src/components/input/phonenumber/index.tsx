import React from 'react';
import cn from 'classnames';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { PhoneIcon } from '@components/icons/phone';
import styles from './phonenumber.module.scss';

interface IInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value: string;
}

export const PhoneNumberInput: React.FC<IInputProps> = ({
  className = '', onChange, placeholder = '29 000 000 00',
  value,
}) => (
  <div className={cn(styles.phoneInputWrapper, { [styles.placeholder]: !value?.length })} data-placeholder={placeholder}>
    <PhoneIcon className={styles.icon} />
    <PhoneInput
      countryCallingCodeEditable={false}
      international
      defaultCountry="BY"
      className={cn(styles.phoneInput, className, { [styles.empty]: true })}
      placeholder={placeholder}
      limitMaxLength
      maxLength={17}
      onChange={onChange}
    />
  </div>
);
