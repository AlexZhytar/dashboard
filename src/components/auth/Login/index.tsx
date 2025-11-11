import React from 'react';
import style from './login.module.scss';
import { LoginForm } from "@/components/auth/Login/LoginForm";
import { DashboardIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";

export const Login = () => {
	const t = useTranslations();
	
	return (
		<div className={ style.login }>
			<div className={ style.login_wrapper }>
				<div className={ style.login_logo }>
					<DashboardIcon size={ 48 }/>
				</div>
				<div className={ style.login_caption }
					 dangerouslySetInnerHTML={ { __html: t('loginForm.title') } }/>
				<LoginForm/>
			</div>
		</div>
	);
};