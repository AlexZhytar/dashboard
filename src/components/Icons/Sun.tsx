import React from 'react';
import { IconProps } from './types';

export const SunIcon: React.FC<IconProps> = ( {
	size = 20,
	className,
} ) => (
	<svg
		width={ size }
		height={ size }
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
	>
		<path
			d="M10.0003 1.44766V0.814148M10.0003 19.1859V18.5524M18.5527 10H19.1862M0.814453 10H1.44796M16.0483 3.95266L16.4963 3.5047M3.50434 16.4954L3.9523 16.0474M16.0483 16.0474L16.4963 16.4953M3.50434 3.50465L3.9523 3.95261M15.056 9.96537C15.056 12.7644 12.787 15.0334 9.98795 15.0334C7.18893 15.0334 4.91988 12.7644 4.91988 9.96537C4.91988 7.16636 7.18893 4.89731 9.98795 4.89731C12.787 4.89731 15.056 7.16636 15.056 9.96537Z"
			strokeWidth="1.5" strokeLinecap="round"/>
	</svg>
);