import React from 'react';
import { CustomError } from '@containers/custom-error';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGUAGE } from '@constants/locales.constants';

export default () => <CustomError type="500" />;

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    ...(await serverSideTranslations(context.locale || LANGUAGE.RU)),
  },
});
