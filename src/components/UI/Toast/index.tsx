import React from 'react';
import style from "./style.module.scss";
import { DangerIcon, InfoIcon } from "@/components/Icons";

interface IProps {
	variant?: 'info' | 'success' | 'warning' | 'error';
	message?: string;
}

const icons = {
	info: <InfoIcon/>,
	success: <InfoIcon/>,
	warning: <InfoIcon/>,
	error: <DangerIcon/>,
}

const Toast = ( { variant = 'info', message = '' }: IProps ) => {
	return (
		<div className={ `${ style.toast } ${ style[variant] }` }>
			{ icons[variant] }
			<div className={ style.toast_message }>{ message } </div>
		</div>
	);
};

export default Toast;