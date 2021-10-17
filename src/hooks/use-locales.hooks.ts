import { useRouter } from "next/router";
import { LANGUAGE } from "@constants/locales.constants";
import { useMemo } from "react";
import English from "../../compiled-locales/en.json";
import Russian from "../../compiled-locales/ru.json";
import Belorussian from "../../compiled-locales/by.json";

// todo add ts to locale
export const useLocales = (): [LANGUAGE, Record<string, any>] => {
	const { locale } = useRouter();
	const [shortLocale] = locale ? locale.split("-") : [LANGUAGE.EN];
	
	const messages = useMemo(() => {
		switch (shortLocale) {
			case LANGUAGE.EN:
				return English;
			case LANGUAGE.BY:
				return Belorussian;
			default:
				return Russian;
		}
	}, [shortLocale]);
	
	return [shortLocale as LANGUAGE, messages];
};
