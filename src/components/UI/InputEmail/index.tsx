import style from "./style.module.scss";
import React from "react";

interface InputMailProps {
	placeholder?: string;
	value: string;
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
	name?: string;
	className?: string;
}

const InputEmail = ( { placeholder = '', value, onChange, name, className = '' }: InputMailProps ) => {
	return (
		<input
			type={ "email" }
			placeholder={ placeholder ?? '' }
			value={ value }
			onChange={ onChange }
			name={ name }
			className={ `${ style.input } ${ className }` }
		/>
	);
};

export default InputEmail;