import React from 'react';
import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGUAGE } from '@constants/locales.constants';
import LandingPage from '@containers/landing';

export default () => <LandingPage />;

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: {
    ...(await serverSideTranslations(context.locale || LANGUAGE.RU)),
  },
});
