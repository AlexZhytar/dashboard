import React from 'react';
import { IconProps } from './types';

export const FlagIcon: React.FC<IconProps> = ( {
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
		<path d="M10.5 4H5V8H10.5L8.5 6L10.5 4Z"/>
		<path d="M5 11.5V8M5 8V4L10.5 4L8.5 6L10.5 8H5Z" strokeLinejoin="round"/>
	</svg>
);