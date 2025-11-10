import React from 'react';
import { IconProps } from './types';

export const SearchIcon: React.FC<IconProps> = ({
    size = 24,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M15.5 15.5L19 19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11Z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);