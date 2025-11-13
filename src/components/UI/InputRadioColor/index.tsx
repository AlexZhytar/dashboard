import style from "./style.module.scss";
import React from "react";

const InputRadioColor = ( {
	name,
	color,
	onChange
}: {
	name: string,
	color: string,
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void
} ) => {
	return (
		<label className={ style.inputRadioColor }>
			<input type="radio" name={ `radio-color-${ name }` } value={ color } onChange={ onChange }/>
			<span className={ `${ style.colorIndicator } ${ style[color] }` }/>
		</label>
	);
}

export default InputRadioColor;