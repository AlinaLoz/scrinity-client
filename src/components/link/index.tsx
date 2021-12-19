import React from 'react';
import NextLink from 'next/link';

interface ILinkProps {
  href: string;
  className?: string;
}

export const Link: React.FC<ILinkProps> = ({
  href, className, children, ...props
}) => (
  <NextLink href={href}>
    <a {...props} className={className}>
      {children}
    </a>
  </NextLink>
);
