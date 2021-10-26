/* eslint-disable */
import React from 'react';

export interface IPhoneIconIcon {
  className?: string;
}

export const PhoneIcon: React.FC<IPhoneIconIcon> = ({ className = '' }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.9984 12.46L12.7284 11.85L10.2084 14.37C7.37844 12.93 5.05844 10.62 3.61844 7.78L6.14844 5.25L5.53844 0H0.0284377C-0.551562 10.18 7.81844 18.55 17.9984 17.97V12.46Z" fill="#C2CFE0" />
  </svg>

);
