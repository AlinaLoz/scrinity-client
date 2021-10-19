import React, { useEffect, useState } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { isMobile } from 'react-device-detect';
import { appWithTranslation } from 'next-i18next';

type TWrappedAppProps = AppInitialProps & AppContext;
const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [isMobileOnClient, setIsMobileOnClient] = useState(true);
  useEffect(() => {
    setIsMobileOnClient(isMobile);
  }, []);

  if (!isMobileOnClient) {
    return (
      <div>Страница открывается только на мобильных устройствах</div>
    );
  }

  return (
    <Component {...pageProps} />
  );
};

// @ts-ignore
export default appWithTranslation(WrappedApp);
