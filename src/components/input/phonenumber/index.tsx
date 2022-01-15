import React from 'react';
import cn from 'classnames';

import { PhoneIcon } from '@components/icons/phone';
import { BY_NUMBER_CODE_PLUS, BY_NUMBER_MASK, NUMBER_REGEXP } from '@constants/auth.constants';
import styles from './phonenumber.module.scss';
import { formatMaskInput } from './helpers';

interface IInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value: string;
}

export const PhoneNumberInput: React.FC<IInputProps> = ({
  className = '', onChange, placeholder = '29 000 000 00',
  value,
}) => {
  const handleChange = (candidateValue: string) => {
    const newValue = formatMaskInput(value, candidateValue, BY_NUMBER_MASK, NUMBER_REGEXP);
    onChange(newValue);
  };

  return (
    <div className={cn(styles.phoneInputWrapper, { [styles.placeholder]: value === BY_NUMBER_CODE_PLUS })} data-placeholder={placeholder}>
      <PhoneIcon className={styles.icon} />
      <input
        inputMode="tel"
        placeholder={placeholder}
        type="text"
        value={value}
        className={cn(styles.phoneInput, className, { [styles.empty]: true })}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
