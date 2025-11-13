import React from 'react';
import { IconProps } from './types';

export const PlusIcon: React.FC<IconProps> = ( {
	size = 10,
	className,
} ) => (
	<svg
		width={ size }
		height={ size }
		viewBox="0 0 10 10"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
	>
		<path d="M4.75 0.75V8.75M8.75 4.75H0.75" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
			  strokeLinejoin="round"/>
	</svg>
);