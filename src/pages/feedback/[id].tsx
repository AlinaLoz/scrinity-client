import { GetServerSideProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Feedback } from '@containers/feedback';
import { getInstitutionAPI } from '@api/companies.service';
import { IInstitution } from '@interfaces/companies.interfaces';
import { LANGUAGE } from '@constants/locales.constants';

export default Feedback;
export const getServerSideProps: GetServerSideProps<{ institution: IInstitution }, { id: string }> = async (context) => {
  try {
    const institution = await getInstitutionAPI(context.params?.id || '');
    if (!institution.isActive) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        institution,
        ...(await serverSideTranslations(context.locale || LANGUAGE.RU)),
      },
    };
  } catch (err) {
    console.log('err', err);
    return {
      notFound: true,
    };
  }
};
