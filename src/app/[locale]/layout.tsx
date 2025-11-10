import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from "@/components/layout/Header/Header";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import AuthGuard from "@/app/AuthGuard";
import { routing } from '@/i18n/routing';
import "@/scss/main.scss";
import React from "react";

const inter = Inter({
	variable: "--font-inter",
	subsets: [ "latin" ],
	display: 'swap'
});

export async function generateMetadata(
	{ params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	return {
		title: t('title'),
		description: t('description'),
		alternates: {
			languages: Object.fromEntries(routing.locales.map(l => [ l, `/${ l }` ]))
		}
	};
}

export const generateStaticParams = () => {
	return routing.locales.map(( locale ) => ({ locale }));
}

export default async function RootLayout( { children, params }: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>
} ) {
	const cookieStore = await cookies();
	const token = !!cookieStore.get('auth_token')?.value;
	
	const { locale } = await params;
	if ( !hasLocale(routing.locales, locale) ) {
	}
	setRequestLocale(locale);
	const messages = await getMessages({ locale });
	
	return (
		<html lang={ locale }>
		<body className={ `${ inter.variable }` }>
		<NextIntlClientProvider locale={ locale } messages={ messages }>
			<AuthProvider status={ token }>
				<AuthGuard>
					<Header/>
					<main className="page-wrapper">
						{ children }
					</main>
				</AuthGuard>
			</AuthProvider>
		</NextIntlClientProvider>
		</body>
		</html>
	);
}
