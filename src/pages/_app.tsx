import React, { useCallback, useEffect, useState } from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { isMobile, isTablet } from 'react-device-detect';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Modal } from '@components/modal';
import { MODAL } from '@constants/modal.constants';
import { ModalContext, TModalData } from '@contexts/modal.context';

import '../assets/main.scss';
import { UserContext } from '@contexts/user.context';
import { useMe } from '@hooks/use-me.hooks';

type TSetDataCb<T extends MODAL> = (type: T, data: TModalData<T>) => void;
type TWrappedAppProps = AppInitialProps & AppContext;

// todo вынести работа с констектом модалки в отд варппер
const WrappedApp = ({ Component, pageProps }: TWrappedAppProps) => {
  const [isMobileOnClient, setIsMobileOnClient] = useState(true);
  const [modalType, setModalType] = useState(MODAL.NONE);
  const [data, setData] = useState<TModalData<MODAL>>(null);
  const [userId] = useMe();
  
  const setDataWrapper = useCallback<TSetDataCb<MODAL>>((type, value) => {
    setModalType(type);
    setData(value);
  }, []);

  useEffect(() => {
    setIsMobileOnClient(isMobile && !isTablet);
  }, []);

  if (!isMobileOnClient) {
    return (
      <div>Страница открывается только на мобильных устройствах</div>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      </Head>
      <ModalContext.Provider value={{
        data, setModalType, modalType, setData: setDataWrapper,
      }}
      >
        <UserContext.Provider value={{ userId }} >
          <Modal />
          <Component {...pageProps} />
        </UserContext.Provider>
      </ModalContext.Provider>
    </>
  );
};

// @ts-ignore
export default appWithTranslation(WrappedApp);
