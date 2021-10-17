import {AppContext, AppInitialProps} from 'next/app';
import {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';

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

export default WrappedApp;
