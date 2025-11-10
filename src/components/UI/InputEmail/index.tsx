import style from "./input-mail.module.scss";
import { InputMailProps } from "./types";

const InputEmail = ( { placeholder = '', value, onChange, name }: InputMailProps ) => {
	return (
		<input
			type={ "email" }
			placeholder={ placeholder ?? '' }
			value={ value }
			onChange={ onChange }
			name={ name }
			className={ style.input }
		/>
	);
};

export default InputEmail;