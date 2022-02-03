import React, { ButtonHTMLAttributes } from 'react';
import { ICON_SIZE_S } from '@constants/ui.constants';

export interface IArrowSliderIcon extends ButtonHTMLAttributes<SVGElement> {
  className?: string;
  color?: string;
  size?: number;
}

export const ArrowSliderIcon: React.FC<IArrowSliderIcon> = ({
  size = ICON_SIZE_S, className = '', ...props
}) => (
  <svg {...props} className={className} width={size} height={size} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.01" x="0.5" y="32.5" width={size} height={size} transform="rotate(-90 0.5 32.5)" fill="#186680" />
    {/* eslint-disable-next-line max-len */}
    <path d="M7.16675 17.8333L22.9801 17.8333L18.1401 23.6466C17.6688 24.2136 17.7464 25.0553 18.3134 25.5266C18.8804 25.9979 19.7221 25.9203 20.1934 25.3533L26.8601 17.3533C26.9049 17.2896 26.945 17.2228 26.9801 17.1533C26.9801 17.0866 26.9801 17.0466 27.0734 16.9799C27.1339 16.827 27.1655 16.6643 27.1667 16.4999C27.1655 16.3355 27.1339 16.1728 27.0734 16.0199C27.0734 15.9533 27.0734 15.9133 26.9801 15.8466C26.945 15.7771 26.9049 15.7102 26.8601 15.6466L20.1934 7.64659C19.9396 7.34187 19.5633 7.16595 19.1667 7.16659C18.8552 7.16598 18.5533 7.27449 18.3134 7.47326C18.0407 7.69933 17.8692 8.02459 17.8367 8.3773C17.8042 8.73 17.9133 9.08115 18.1401 9.35326L22.9801 15.1666L7.16675 15.1666C6.43037 15.1666 5.83342 15.7635 5.83342 16.4999C5.83342 17.2363 6.43037 17.8333 7.16675 17.8333Z" fill="#186680" />
  </svg>
);
