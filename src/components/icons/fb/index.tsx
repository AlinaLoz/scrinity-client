/* eslint-disable */
import React, { ButtonHTMLAttributes } from 'react';

export interface ICloseIcon extends ButtonHTMLAttributes<SVGElement> {
	className?: string;
}

export const FbIcon: React.FC<ICloseIcon> = ({ className = '', ...props }) => (
<svg className={className} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect opacity="0.01" x="24" y="24" width="24" height="24" transform="rotate(180 24 24)" fill="white"/>
	<path d="M17 3.50015C17 3.22401 16.7761 3.00015 16.5 3.00015H14C11.3793 2.86961 9.14528 4.88025 9 7.50015V10.2002H6.5C6.22386 10.2002 6 10.424 6 10.7002V13.3002C6 13.5763 6.22386 13.8002 6.5 13.8002H9V20.5002C9 20.7763 9.22386 21.0002 9.5 21.0002H12.5C12.7761 21.0002 13 20.7763 13 20.5002V13.8002H15.62C15.8487 13.8034 16.0505 13.6511 16.11 13.4302L16.83 10.8302C16.8703 10.6804 16.8389 10.5205 16.7449 10.3971C16.6509 10.2738 16.5051 10.201 16.35 10.2002H13V7.50015C13.0515 6.98725 13.4845 6.59757 14 6.60015H16.5C16.7761 6.60015 17 6.3763 17 6.10015V3.50015Z" fill="white"/>
</svg>
);
