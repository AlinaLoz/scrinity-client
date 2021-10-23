/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface ILoadPhotoIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
}

export const LoadPhotoIcon: React.FC<ILoadPhotoIcon> = ({ className = '', ...props }) => (
  <svg className={className} {...props} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.9375 2.5L7.99313 4.58333H4.625C3.45625 4.58333 2.5 5.52083 2.5 6.66667V19.1667C2.5 20.3125 3.45625 21.25 4.625 21.25H21.625C22.7938 21.25 23.75 20.3125 23.75 19.1667V6.66667C23.75 5.52083 22.7938 4.58333 21.625 4.58333H18.2569L16.3125 2.5H9.9375ZM13.125 18.125C10.1925 18.125 7.8125 15.7917 7.8125 12.9167C7.8125 10.0417 10.1925 7.70833 13.125 7.70833C16.0575 7.70833 18.4375 10.0417 18.4375 12.9167C18.4375 15.7917 16.0575 18.125 13.125 18.125Z" fill="#C2CFE0" />
  </svg>
);
