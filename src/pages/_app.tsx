import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';

type TWrappedAppProps = AppInitialProps & AppContext;

const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  return (
    <Component {...pageProps} />
  );
};

WrappedApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
};

export default WrappedApp;
