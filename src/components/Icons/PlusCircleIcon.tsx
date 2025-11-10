import React from 'react';
import { IconProps } from './types';

export const PlusCircleIcon: React.FC<IconProps> = ({
    size = 14,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M7 4V10M10 7H4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="6.25" strokeWidth="1.5" />
    </svg>
);