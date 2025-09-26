'use client';

import React from 'react';
import { ButtonProps } from './types';
import style from "./button.module.scss";

const variants = ['primary', 'secondary', 'danger', 'transparent'];

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    className,
    children,
    type = 'button',
    ...other
}) => {
    const variantClass = variants.includes(variant) ? `button_${[variant]}` : '';

    return (
        <button className={`${style.button} ${style[variantClass]} ${className ? style[`button_${className}`] : ''}`}
            type={type}
            {...other}>
            {children}
        </button>
    );
};

export default Button;