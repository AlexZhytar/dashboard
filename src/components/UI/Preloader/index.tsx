import React from 'react';
import styles from './style.module.scss';

type Props = {
	size?: 's' | 'sm' | 'm' | 'b',
	overflow?: boolean,
	color?: string,
	position?: 'absolute' | 'fixed',
	customClass?: string
}

const Preloader = ( { size = 'm', overflow, color, position = 'absolute', customClass }: Props ) => {
	const over = overflow ? styles.overflow : styles.alpha;
	
	let preloaderSize = {
		's': styles.s,
		'sm': styles.sm,
		'm': styles.m,
		'b': styles.b
	};
	
	let positionStyle = {
		'absolute': styles.absolute,
		'fixed': styles.fixed
	};
	
	return (
		<div className={ `${ styles.preloader } ${ preloaderSize[size] }
    ${ over && over }
    ${ positionStyle && positionStyle[position] }
    ${ customClass ?? '' }` }
			 style={ { backgroundColor: color ? styles.color : '' } }
		/>
	);
};

export default Preloader;