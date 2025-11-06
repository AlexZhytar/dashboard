import style from "./input-text.module.scss";
import { InputTextProps } from "./types";

const InputText = ( { placeholder = '', value, onChange, name, number = false }: InputTextProps ) => {
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
			className={ style.input }
			inputMode={ number ? "numeric" : undefined }
			pattern={ number ? "[0-9]*" : undefined }
		/>
	);
};

export default InputText;