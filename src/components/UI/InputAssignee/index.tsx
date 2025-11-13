import style from "./style.module.scss";
import React from "react";

const InputAssignee = (
	{ inputName, userName, onChange, idUser }:
	{
		inputName: string,
		userName: string,
		onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void,
		idUser: string
	} ) => {
	
	return (
		<label className={ style.inputAssignee }>
			<input type="checkbox" className={ style.inputAssignee_input } data-user-id={ idUser }
				   name={ `${ inputName }` }
				   value={ userName }
				   onChange={ onChange }/>
			<span className={ style.inputAssignee_fullname }>{ userName }</span>
			<span className={ style.inputAssignee_checkmark }></span>
		</label>
	);
}

export default InputAssignee;