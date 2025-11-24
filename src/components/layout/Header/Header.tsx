import Container from '@/components/layout/Container';
import style from './header.module.scss';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import HeaderAddProject from './HeaderAddProject';
import HeaderAccount from "./HeaderAccount";
import { DashboardIcon } from "@/components/Icons";
import LocaleSwitcher from "../LocaleSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import React from "react";

const menu = [
	{ title: "Dashboard", href: '/' }
];

const Header = () => {
	return (
		<header className={ style.header }>
			<Container>
				<div className={ style.header_wrapper }>
					<Link href="/" className={ style.header_logo }>
						<DashboardIcon/>
					</Link>
					<div className={ style.header_nav }>
						<HeaderMenu menu={ menu }/>
					</div>
					<div className={ style.header_actions }>
						<div className={ style.header_actions_line }></div>
						<HeaderAddProject/>
						<ThemeSwitcher/>
						<LocaleSwitcher className={ style.lang }/>
						<HeaderAccount/>
					</div>
				</div>
			</Container>
		</header>
	);
}

export default Header;