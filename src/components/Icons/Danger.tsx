import React from 'react';
import { IconProps } from './types';

export const DangerIcon: React.FC<IconProps> = ( {
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
			d="M9.99986 7.50023V11.6669M9.99529 14.1669H10.0028M9.99986 17.8419H4.94986C2.0582 17.8419 0.849863 15.7752 2.24986 13.2502L4.84986 8.56689L7.29986 4.16689C8.7832 1.49189 11.2165 1.49189 12.6999 4.16689L17.7499 13.2586C19.1499 15.7836 17.9332 17.8502 15.0499 17.8502H9.99986V17.8419Z"
			strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);