import React from 'react';
import { IconProps } from './types';

export const PencilIcon: React.FC<IconProps> = ( {
	size = 24,
	className,
} ) => (
	<svg
		width={ size }
		height={ size }
		viewBox="0 0 32 32"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
	>
		<path
			d="M18.746 12 20 13.254 7.895 25.332H6.668v-1.227L18.746 12m4.8-8c-.331 0-.679.133-.933.387l-2.441 2.441 5 5 2.441-2.441c.52-.52.52-1.387 0-1.88l-3.12-3.12A1.307 1.307 0 0 0 23.546 4m-4.8 4.254L4 23v5h5l14.746-14.746Zm0 0"/>
	</svg>
);
