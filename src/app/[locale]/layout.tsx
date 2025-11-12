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
	subsets: [ 'latin', 'cyrillic' ],
	weight: [ '400', '500', '600', '700' ],
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

const fallbackScript = `(function(){try{
  var m=document.cookie.match('(^|;)\\s*dashboard-theme\\s*=\\s*([^;]+)');
  var theme = m ? decodeURIComponent(m[2]) : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}catch(e){} })();`;

export default async function RootLayout( { children, params }: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>
} ) {
	const cookieStore = await cookies();
	const token = !!cookieStore.get('dash-auth')?.value;
	const themeFromCookie = cookieStore.get('dashboard-theme')?.value;
	
	const { locale } = await params;
	if ( !hasLocale(routing.locales, locale) ) {
	}
	setRequestLocale(locale);
	const messages = await getMessages({ locale });
	
	return (
		<html lang={ locale } data-theme={ themeFromCookie ?? undefined }>
		{ !themeFromCookie && <script dangerouslySetInnerHTML={ { __html: fallbackScript } }/> }
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
