/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface ITrashIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const TrashIcon: React.FC<ITrashIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.78571 16.3333C5.78571 17.25 6.49286 18 7.35714 18H13.6429C14.5071 18 15.2143 17.25 15.2143 16.3333V6.33333H5.78571V16.3333ZM16 3.83333H13.25L12.4643 3H8.53571L7.75 3.83333H5V5.5H16V3.83333Z" fill="#C2CFE0"/>
	</svg>
);
