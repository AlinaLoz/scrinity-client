import { GetServerSideProps } from 'next/types'

import { Review } from '@containers/review';
import { getCompanyAPI } from '@api/companies.service';
import { ICompany } from '@interfaces/companies.interfaces';

export default Review;

export const getServerSideProps: GetServerSideProps<{ company: ICompany }, { id: string } > = async (context) => {
	try {
		const company = await getCompanyAPI(context.params?.id || '');
		if (!company.isActive) {
			return {
				notFound: true,
			}
		}
		return {
			props: { company },
		};
	} catch (err) {
		console.log('err', err);
		return {
			notFound: true,
		}
	}
};
