"use client";

import React, { useState } from 'react';
import style from "./login.module.scss";
import { delay } from "@/utils";
import { useUserStore } from "@/store";
import { Button, InputEmail, InputText, Preloader, Toast } from "@/components/UI";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
	const [ token, setToken ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const { authorized, setAuthorized } = useUserStore();
	const [ checkAuth, setCheckAuth ] = useState(false);
	const t = useTranslations();
	
	const [ formData, setFormData ] = useState<{
		loginEmail: string;
		loginPassword: string;
	}>({
		loginEmail: "",
		loginPassword: "",
	});
	
	const [ errors, setErrors ] = useState<{
		loginEmail?: string;
		loginPassword?: string;
	}>({});
	
	const isValidEmail = ( email: string ) => {
		const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
		return re.test(email);
	};
	
	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: undefined }));
	};
	
	
	const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		
		const newErrors: { loginEmail?: string; loginPassword?: string } = {};
		setCheckAuth(false);
		
		// Email validation
		const email = formData.loginEmail.trim();
		if ( !email ) {
			newErrors.loginEmail = t("loginForm.errors.loginEmailEmpty");
		} else if ( !isValidEmail(email) ) {
			newErrors.loginEmail = t("loginForm.errors.loginEmail");
		}
		
		// Password validation
		const password = formData.loginPassword;
		if ( !password.trim() ) {
			newErrors.loginPassword = t("loginForm.errors.loginPasswordEmpty");
		} else if ( password.length < 8 ) {
			newErrors.loginPassword = t("loginForm.errors.loginPassword");
		}
		
		if ( Object.keys(newErrors).length ) {
			setErrors(newErrors);
			return;
		}
		
		setLoading(true);
		
		try {
			const response = await fetch("/api/user/login", {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
			});
			
			if ( !response.ok ) {
				const res = await response.text();
				setCheckAuth(true);
				setLoading(false);
				return;
			}
			
			const data = await response.json();
			const receivedToken = data.token;
			setToken(receivedToken);
			
			// Збереження токена — використовуємо отриманий токен без очікування setToken
			await fetch('/api/user/save-token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: receivedToken }),
			});
			
			setAuthorized(true);
			setCheckAuth(false);
			setLoading(false);
			delay(1000).then(() => window.location.reload());
			
		} catch ( error ) {
			setLoading(false);
			console.error('Ошибка запроса:', error);
		}
	};
	
	
	return (
		<form noValidate className={ style.login_form } onSubmit={ handleSubmit }>
			{ loading && <Preloader size={ 'm' } overflow={ true }/> }
			<div className={ style.formField }>
				<label> { t("loginForm.email") }</label>
				<InputEmail value={ formData.loginEmail } name="loginEmail" onChange={ handleChange }/>
				{ errors.loginEmail && <Toast variant="warning" message={ errors.loginEmail }/> }
			</div>
			<div className={ style.formField }>
				<label> { t("loginForm.password") }</label>
				<InputText value={ formData.loginPassword } name="loginPassword" onChange={ handleChange }/>
				{ errors.loginPassword && <Toast variant="warning" message={ errors.loginPassword }/> }
			</div>
			<div className={ style.formField }>
				<Button variant="primary" type="submit">
					<span>{ t("loginForm.loginButton") }</span>
				</Button>
				{ checkAuth && <Toast variant="error" message={ t("loginForm.errors.wrongAuth") }/> }
				{ authorized && <Toast variant="success" message={ t("loginForm.successAuth") }/> }
			</div>
		</form>
	);
};
