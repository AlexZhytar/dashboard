import * as React from 'react';
import style from './login.module.scss';
import { uiText } from '@/constants';
import { LoginForm } from "@/components/auth/Login/LoginForm";

type Props = {};
export const Login = ( props: Props ) => {
	return (
		<div className={ style.login }>
			<div className={ style.login_wrapper }>
				<div className={ style.login_logo }>
					<img src="./icon/dashboard.svg" alt="icon dashboard"/>
				</div>
				<div className={ style.login_caption }>
					{ uiText.loginForm.title }
				</div>
				<LoginForm/>
			</div>
		</div>
	);
};