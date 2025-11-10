import React from 'react';
import { IconProps } from './types';

export const ClockIcon: React.FC<IconProps> = ({
    size = 12,
    className,
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M6 1C8.76142 1 11 3.23858 11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1ZM6 2.75C5.58579 2.75 5.25 3.08579 5.25 3.5V6C5.25 6.23594 5.36114 6.45796 5.5498 6.59961L7.5498 8.09961C7.88107 8.34806 8.35102 8.2813 8.59961 7.9502C8.84806 7.61893 8.7813 7.14898 8.4502 6.90039L6.75 5.625V3.5C6.75 3.08579 6.41421 2.75 6 2.75Z" />
    </svg>
);