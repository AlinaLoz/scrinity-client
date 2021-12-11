/* eslint-disable */
import React from 'react';

export interface ISearchIcon {
  className?: string;
}

export const SearchIcon: React.FC<ISearchIcon> = ({ className = '', ...props }) => (
  <svg className={className} {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.4167 9.16667H9.75833L9.525 8.94167C10.3417 7.99167 10.8333 6.75833 10.8333 5.41667C10.8333 2.425 8.40833 0 5.41667 0C2.425 0 0 2.425 0 5.41667C0 8.40833 2.425 10.8333 5.41667 10.8333C6.75833 10.8333 7.99167 10.3417 8.94167 9.525L9.16667 9.75833V10.4167L13.3333 14.575L14.575 13.3333L10.4167 9.16667ZM5.41667 9.16667C3.34167 9.16667 1.66667 7.49167 1.66667 5.41667C1.66667 3.34167 3.34167 1.66667 5.41667 1.66667C7.49167 1.66667 9.16667 3.34167 9.16667 5.41667C9.16667 7.49167 7.49167 9.16667 5.41667 9.16667Z" fill="#C2CFE0"/>
  </svg>
);


