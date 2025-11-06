'use client';

import React from 'react';
import { ButtonProps } from './types';
import style from "./button.module.scss";

const Button: React.FC<ButtonProps> = ( {
	variant = 'primary',
	className = '',
	children,
	type = 'button',
	...other
} ) => {
	
	return (
		<button
			className={ `${ style.button } ${ style[`button_${ variant }`] } ${ className ? className : '' }` }
			type={ type }
			{ ...other }>
			{ children }
		</button>
	);
};

export default Button;