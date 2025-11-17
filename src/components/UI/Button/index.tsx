'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import style from "./style.module.scss";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'clear';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	className?: string;
	children: ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ( {
	variant = 'primary',
	className = '',
	children,
	onClick,
	type = 'button',
	...other
} ) => {
	
	return (
		<button
			className={ `${ style.button } ${ style[`button_${ variant }`] } ${ className ? className : '' }` }
			type={ type }
			onClick={ onClick }
			{ ...other }>
			{ children }
		</button>
	);
};

export default Button;