import '../../scripts/wdyr';
import React, { useEffect, useState } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { isMobile, isTablet } from 'react-device-detect';
import { appWithTranslation } from 'next-i18next';
import '../assets/main.scss';

type TWrappedAppProps = AppInitialProps & AppContext;
const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [isMobileOnClient, setIsMobileOnClient] = useState(true);
  useEffect(() => {
    setIsMobileOnClient(isMobile && !isTablet);
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
