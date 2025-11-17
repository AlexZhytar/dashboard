import React from 'react';
import { IconProps } from './types';

export const DotsIcon: React.FC<IconProps> = ( {
	size = 24,
	className,
} ) => (
	<svg
		width={ size }
		height={ size }
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
	>
		<circle cx="6.75" cy="12" r="1.25"/>
		<circle cx="12" cy="12" r="1.25"/>
		<path
			d="M18.4999 12C18.4999 12.6904 17.9403 13.25 17.2499 13.25C16.5596 13.25 15.9999 12.6904 15.9999 12C15.9999 11.3096 16.5596 10.75 17.2499 10.75C17.9403 10.75 18.4999 11.3096 18.4999 12Z"/>
	</svg>
);