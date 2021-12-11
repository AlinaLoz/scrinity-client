import React from 'react';
import ReactLoading from 'react-loading';
import cn from 'classnames';
import { Router } from 'next/router';
import ReactDOM from 'react-dom';

import styles from './page-loader.module.scss';

interface IPageLoaderProps {
  className?: string,
}
export const PageLoader: React.FC<IPageLoaderProps> = ({
  className = '',
}) => (
  <div className={cn(styles.pageLoader, className)}>
    <ReactLoading type="spinningBubbles" color="#2E5D6C" height="20%" width="20%" />
  </div>
);

export const initLoader = (): void => {
  Router.events.on('routeChangeStart', () => {
    ReactDOM.render(
      <PageLoader />,
      document.getElementById('page-loader'),
    );
  });
  Router.events.on('routeChangeComplete', () => {
    // @ts-ignore
    ReactDOM.unmountComponentAtNode(document.getElementById('page-loader'));
  });
  Router.events.on('routeChangeError', () => {
    // @ts-ignore
    ReactDOM.unmountComponentAtNode(document.getElementById('page-loader'));
  });
};
