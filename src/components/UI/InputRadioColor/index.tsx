import style from "./style.module.scss";
import React from "react";
import { Tooltip } from "react-tooltip";

const InputRadioColor = ( {
	name,
	color,
	onChange,
	checked
}: {
	name: string,
	color: string,
	checked: boolean,
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void
} ) => {
	return (
		<label className={ style.inputRadioColor } id={ `${ name }-${ color }` }>
			<input type="radio"
				   name={ name }
				   value={ color }
				   checked={ checked }
				   onChange={ onChange }/>
			<span className={ `${ style.colorIndicator } ${ style[color] }` }/>
			<Tooltip anchorSelect={ `#${ name }-${ color }` }
					 className={ `tooltip` }
					 offset={ 12 }
					 place={ "bottom" }>
				<div>{ color }</div>
			</Tooltip>
		</label>
	);
}

export default InputRadioColor;