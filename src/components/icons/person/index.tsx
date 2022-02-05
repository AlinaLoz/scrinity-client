/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface IPersonIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const PersonIcon: React.FC<IPersonIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M15 15C17.7625 15 20 12.7625 20 10C20 7.2375 17.7625 5 15 5C12.2375 5 10 7.2375 10 10C10 12.7625 12.2375 15 15 15ZM15 17.5C11.6625 17.5 5 19.175 5 22.5V25H25V22.5C25 19.175 18.3375 17.5 15 17.5Z" fill="#40798C"/>
</svg>
);
