import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['en', 'uk'],
	localePrefix: 'as-needed',
	defaultLocale: 'en',
});