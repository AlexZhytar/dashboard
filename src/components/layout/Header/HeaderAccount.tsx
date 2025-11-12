"use client";

import React from 'react';
import { Button, Preloader } from "@/components/UI";
import style from "./header.module.scss";
import { useUser } from "@/features/user";
import { getInitials } from "@/utils";

const HeaderAccount = () => {
	const { user, isLoading } = useUser();
	
	return (
		<Button type="button" variant={ 'secondary' } className={ style.account }>
			{ isLoading && !user && <Preloader size={ "s" } overflow={ false }/> }
			{ user && <span>{ getInitials(`${ user.first_name } ${ user.last_name }`) }</span> }
		</Button>
	);
};

export default HeaderAccount;