declare module '@utils/config' {
	enum ENVIRONMENT_TYPE {
		DEVELOP = 'develop',
		MASTER = 'master',
		PROD = 'prod',
	}
	export const ENVIRONMENT: ENVIRONMENT_TYPE;
	export const API_URL: string;
	export const STATIC_FILES: string;
}

declare module 'use-file-upload' {
	type FileUpload = {
		source: string
		name: string
		size: number
		file: File
	}
}
