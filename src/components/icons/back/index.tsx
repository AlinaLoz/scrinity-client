import React, { ButtonHTMLAttributes } from 'react';

export interface IBackIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
}

export const BackIcon: React.FC<IBackIcon> = ({ className = '', ...props }) => (
  <svg {...props} className={className} width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L1 9L9 17" stroke="#40798C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
