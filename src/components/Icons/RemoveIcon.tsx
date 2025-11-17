import React from 'react';
import { IconProps } from './types';

export const RemoveIcon: React.FC<IconProps> = ( {
	size = 16,
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
			d="M13.332 2.668 12 4H4v2.668h24V4h-8l-1.332-1.332ZM5.82 9.332 7.855 27.02a2.673 2.673 0 0 0 2.645 2.312h10.996a2.68 2.68 0 0 0 2.649-2.324L26.18 9.332Zm0 0"/>
	</svg>
);
