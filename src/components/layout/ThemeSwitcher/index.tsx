"use client";

import React, { useCallback, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import style from "./style.module.scss";
import { useUserStore } from "@/store";
import { Preloader } from "@/components/UI";

const ThemeSwitcher = () => {
	const darkTheme = useUserStore(( s ) => s.darkTheme);
	const setDarkTheme = useUserStore(( s ) => s.setDarkTheme);
	const [ hydrated, setHydrated ] = useState(false);
	
	const handleToggleTheme = useCallback(() => {
		setDarkTheme(!darkTheme);
	}, [ darkTheme, setDarkTheme ]);
	
	const setCookie = ( name: string, value: string, days = 365 ) => {
		try {
			const expires = new Date(Date.now() + days * 864e5).toUTCString();
			const secure = location.protocol === "https:" ? "; Secure" : "";
			document.cookie =
				`${ name }=${ encodeURIComponent(value) }; Expires=${ expires }; Path=/; SameSite=Lax` +
				secure;
		} catch ( e ) {
			console.error("Error setting cookie:", e);
		}
	};
	
	useEffect(() => {
		const root = document.documentElement;
		root.dataset.theme = darkTheme ? "dark" : "light";
		
		setCookie("dashboard-theme", darkTheme ? "dark" : "light", 365);
		setHydrated(true);
	}, [ darkTheme ]);
	
	if ( !hydrated ) return <div className={ style.themeSwitcher }><Preloader size={ 's' }/></div>;
	
	return (
		<button
			className={ style.themeSwitcher }
			aria-pressed={ darkTheme }
			onClick={ handleToggleTheme }
			type="button"
		>
      <span className={ darkTheme ? style.iconDark : style.iconLight }>
        { darkTheme ? <MoonIcon/> : <SunIcon/> }
      </span>
		</button>
	);
};

export default ThemeSwitcher;
