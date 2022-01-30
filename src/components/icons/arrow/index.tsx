import React, { ButtonHTMLAttributes } from 'react';

export interface IBackIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
  color?: string;
}

export const ArrowIcon: React.FC<IBackIcon> = ({ color = 'white', className = '', ...props }) => (
  <svg {...props} className={className} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path d="M5.57031 1.58203C5.29688 1.85547 5.32422 2.26562 5.57031 2.53906L8.87891 5.65625H1.03125C0.648438 5.65625 0.375 5.95703 0.375 6.3125V7.1875C0.375 7.57031 0.648438 7.84375 1.03125 7.84375H8.87891L5.57031 10.9883C5.32422 11.2617 5.32422 11.6719 5.57031 11.9453L6.17188 12.5469C6.44531 12.793 6.85547 12.793 7.10156 12.5469L12.4336 7.21484C12.6797 6.96875 12.6797 6.55859 12.4336 6.28516L7.10156 0.980469C6.85547 0.734375 6.44531 0.734375 6.17188 0.980469L5.57031 1.58203Z" fill={color} />
  </svg>
);
