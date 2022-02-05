/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface IEmailIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const EmailIcon: React.FC<IEmailIcon> = ({ className = '', ...props }) => (
	<svg className={className} {...props} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect opacity="0.01" width="30" height="30" fill="#40798C"/>
	<path fillRule="evenodd" clipRule="evenodd" d="M23.75 5H6.25C4.17893 5 2.5 6.67893 2.5 8.75V21.25C2.5 23.3211 4.17893 25 6.25 25H23.75C25.8211 25 27.5 23.3211 27.5 21.25V8.75C27.5 6.67893 25.8211 5 23.75 5ZM23.75 7.5L15.625 13.0875C15.2382 13.3108 14.7618 13.3108 14.375 13.0875L6.25 7.5H23.75Z" fill="#40798C"/>
</svg>
);
