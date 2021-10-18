import 'react-i18next'
// place it where you store your types
// import all namespaces for default language only
import common from 'public/locales/en/common.json';

export interface MyResources {
	common: typeof common;
}

declare module 'react-i18next' {
	// and extend them!
	interface Resources extends MyResources {}
}
