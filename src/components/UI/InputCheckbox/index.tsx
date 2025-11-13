import style from "./style.module.scss";
import React from "react";

interface InputCheckboxProps {
	inputName?: string;
	value: string;
	checked: boolean;
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
}

const InputCheckbox = (
	{ inputName = '', value, onChange, checked = false }: InputCheckboxProps ) => {
	
	return (
		<label className={ style.checkbox }>
			<input type="checkbox" className={ style.checkbox_input }
				   name={ `${ inputName }` }
				   value={ value }
				   checked={ checked }
				   onChange={ onChange }/>
			<span className={ style.checkbox_value }>{ value }</span>
			<span className={ style.checkbox_mark }></span>
		</label>
	);
}

export default InputCheckbox;