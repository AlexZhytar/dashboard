import React from "react";
import style from './style.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string;
	onChange: ( e: React.ChangeEvent<HTMLTextAreaElement> ) => void;
}

const Textarea = ( {
	value,
	onChange,
	placeholder,
	name,
	rows = 4,
	cols,
	className,
	...rest
}: TextareaProps ) => {
	return (
		<textarea
			name={ name }
			placeholder={ placeholder }
			rows={ rows }
			cols={ cols }
			className={ `${ style.textarea } ${ className }` }
			value={ value }
			onChange={ onChange }
			{ ...rest }
		/>
	);
};

export default Textarea;