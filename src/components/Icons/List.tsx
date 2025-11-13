import React from 'react';
import { IconProps } from './types';

export const ListIcon: React.FC<IconProps> = ( {
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
		<path
			d="M12 9.75C12 9.33579 12.3358 9 12.75 9H18.25C18.6642 9 19 9.33579 19 9.75C19 10.1642 18.6642 10.5 18.25 10.5H12.75C12.3358 10.5 12 10.1642 12 9.75Z"/>
		<path
			d="M12 15.75C12 15.3358 12.3358 15 12.75 15H18.25C18.6642 15 19 15.3358 19 15.75C19 16.1642 18.6642 16.5 18.25 16.5H12.75C12.3358 16.5 12 16.1642 12 15.75Z"/>
		<path d="M6 9.5L7.5 11L9.5 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M6 15.5L7.5 17L9.5 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);