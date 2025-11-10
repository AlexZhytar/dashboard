import React from 'react';
import { Button } from "@/components/UI";
import style from "./header.module.scss";

const HeaderAccount = () => {
	return (
		<Button type="button" variant={ 'secondary' } className={ style.account }>
			<span></span>
		</Button>
	);
};

export default HeaderAccount;