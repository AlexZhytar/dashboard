import React from 'react';
import { IconProps } from './types';

export const CalendarIcon: React.FC<IconProps> = ({
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
        <path d="M3 1.75C3 1.33579 3.33579 1 3.75 1C4.16421 1 4.5 1.33579 4.5 1.75V3H3V1.75Z" />
        <path d="M7.5 1.75C7.5 1.33579 7.83579 1 8.25 1C8.66421 1 9 1.33579 9 1.75V3H7.5V1.75Z" />
        <path d="M11 9C11 10.1046 10.1046 11 9 11H3C1.89543 11 1 10.1046 1 9V6.5H11V9ZM9 3C10.1046 3 11 3.89543 11 5H1C1 3.89543 1.89543 3 3 3H9Z" />

    </svg>
);