import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {hasLocale} from 'next-intl';

export default getRequestConfig(async ({requestLocale}) => {
	const req = await requestLocale;
	const locale = hasLocale(routing.locales, req) ? req : routing.defaultLocale;
	return {
		locale,
		messages: (await import(`../i18n/messages/${locale}.json`)).default
	};
});
