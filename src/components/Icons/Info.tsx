import React from 'react';
import { IconProps } from './types';

export const InfoIcon: React.FC<IconProps> = ( {
	size = 16,
	className,
} ) => (
	<svg
		width={ size }
		height={ size }
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
	>
		<path
			d="M8.00065 10.6667V7.33333M7.99699 5.33333H8.00298M8.00065 1.33333C11.6673 1.33333 14.6673 4.33333 14.6673 8C14.6673 11.6667 11.6673 14.6667 8.00065 14.6667C4.33398 14.6667 1.33398 11.6667 1.33398 8C1.33398 4.33333 4.33398 1.33333 8.00065 1.33333Z"
			strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);