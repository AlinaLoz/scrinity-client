export interface ICompany {
	id: string;
	name: string;
	managerTitle: string;
	isActive: boolean
	expiredTime: string;
}

export interface IGetCompanyAPIResponse extends ICompany {}
