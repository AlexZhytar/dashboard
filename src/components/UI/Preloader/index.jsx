import React from 'react';
import styles from './style.module.scss';

const Preloader = ( { size, overflow, color, position = 'absolute', customClass } ) => {
  
  let over = {
    true: styles.overflow,
    false: styles.alpha
  }
  
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
    ${ over && over[overflow] }
    ${ positionStyle && positionStyle[position] }
    ${ customClass ?? '' }` }
    style={{backgroundColor: color ? styles.color : '' }}
    />
  );
};

export default Preloader;