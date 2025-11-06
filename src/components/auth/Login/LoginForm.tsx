import React, { useState } from 'react';
import style from "./login.module.scss";
import { uiText } from "@/constants";
import Button from "@/components/UI/Button";
import InputText from "@/components/UI/InputText";
import { api } from "@/utils";

export const LoginForm = () => {
	const [ formData, setFormData ] = useState<{
		loginEmail: string;
		loginPassword: string;
	}>({
		loginEmail: "",
		loginPassword: "",
	});
	
	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
		const { name, value, type } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};
	
	const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		try {
			const response = await fetch(api.getUrl('/employee/login/'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.loginEmail,
					password: formData.loginPassword,
				}),
			});
			
			if ( !response.ok ) {
				const res = await response.text();
				console.error('Ошибка:', res);
				return;
			}
			
			const data = await response.json();
			console.log(data);
		} catch ( error ) {
			console.error('Ошибка запроса:', error);
		}
	};
	
	return (
		<form noValidate className={ style.login_form } onSubmit={ handleSubmit }>
			<div className={ style.formField }>
				<label> { uiText.loginForm.email }</label>
				<InputText value={ formData.loginEmail } name="loginEmail" onChange={ handleChange }
				/>
			</div>
			<div className={ style.formField }>
				<label> { uiText.loginForm.password }</label>
				<InputText value={ formData.loginPassword } name="loginPassword" onChange={ handleChange }/>
			</div>
			<div className={ style.formField }>
				<Button variant="primary" type="submit">
					<span>{ uiText.loginForm.loginButton }</span>
				</Button>
			</div>
		</form>
	);
};
