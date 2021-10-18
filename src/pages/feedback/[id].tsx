import { GetServerSideProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Feedback } from '@containers/feedback';
import { getCompanyAPI } from '@api/companies.service';
import { ICompany } from '@interfaces/companies.interfaces';
import { LANGUAGE } from '@constants/locales.constants';

export default Feedback;
export const getServerSideProps: GetServerSideProps<{ company: ICompany }, { id: string }> = async (context) => {

  try {
    const company = await getCompanyAPI(context.params?.id || '');
    if (!company.isActive) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        company,
        ...(await serverSideTranslations(context.locale || LANGUAGE.RU)),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
