import style from "./style.module.scss";
import React from "react";

const InputAssignee = (
	{ inputName, first_name = '', last_name = '', onChange, idUser, checked = false }:
	{
		inputName: string,
		first_name: string,
		last_name: string,
		checked?: boolean,
		onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void,
		idUser: string
	} ) => {
	
	return (
		<label className={ style.inputAssignee }>
			<input type="checkbox" className={ style.inputAssignee_input }
				   data-user-id={ idUser }
				   data-first-name={ first_name }
				   data-last-name={ last_name }
				   name={ `${ inputName }` }
				   value={ `${ first_name } ${ last_name }` }
				   checked={ checked }
				   onChange={ onChange }/>
			<span className={ style.inputAssignee_fullname }>{ `${ first_name } ${ last_name }` }</span>
			<span className={ style.inputAssignee_checkmark }></span>
		</label>
	);
}

export default InputAssignee;