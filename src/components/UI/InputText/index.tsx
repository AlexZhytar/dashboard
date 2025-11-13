import style from "./style.module.scss";
import React from "react";

interface InputTextProps {
	placeholder?: string;
	value: string;
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
	number?: boolean;
	name?: string;
	className?: string;
}

const InputText = ( { placeholder = '', value, onChange, name, number = false, className = '' }: InputTextProps ) => {
	let onlyNumb;
	if ( number ) {
		onlyNumb = value.replace(/[^0-9]/g, "");
	}
	
	const placeholderCheck = {
		placeholder: placeholder ?? ''
	}
	
	return (
		<input
			type={ "text" }
			placeholder={ placeholder ?? '' }
			value={ number ? onlyNumb : value }
			onChange={ onChange }
			name={ name }
			className={ `${ style.input } ${ className }` }
			inputMode={ number ? "numeric" : undefined }
			pattern={ number ? "[0-9]*" : undefined }
		/>
	);
};

export default InputText;