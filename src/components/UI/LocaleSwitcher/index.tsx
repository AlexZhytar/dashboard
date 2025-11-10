'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Button } from "@/components/UI";
import style from "./style.module.scss";

export default function LocaleSwitcher( { className }: { className?: string } ) {
	const t = useTranslations();
	const current = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	
	const switchTo = ( nextLocale: string ) => {
		router.push(pathname, { locale: nextLocale });
	};
	
	return (
		<div className={ `${ style.languageSwitcher } ${ className ?? '' }` }>
			{ routing.locales.map(( l ) => (
				<Button
					key={ l }
					variant={ `${ l === current ? 'primary' : 'secondary' }` }
					onClick={ () => switchTo(l) }
					className={ `${ style.button } ${ l === current ? style.active : '' }` }
					aria-current={ l === current ? 'true' : undefined }
				>
					{ l.toUpperCase() }
				</Button>
			)) }
		</div>
	);
}
