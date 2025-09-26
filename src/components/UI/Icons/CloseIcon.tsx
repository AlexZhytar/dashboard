import React from 'react';
import { IconProps } from './types';

export const CloseIcon: React.FC<IconProps> = ({
    size = 24,
    className,
    onClick
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
    >
        <path d="M16.9512 7.04688L7.05168 16.9464" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.05176 7.05371L16.9513 16.9532" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);