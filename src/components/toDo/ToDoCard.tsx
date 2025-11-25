import React from 'react';
import style from './style.module.scss';
import { FlagIcon, PinIcon, TextLeftIcon } from "@/components/Icons";
import { Button } from "@/components/UI";
import { convertTimestampToDate } from "@/utils";
import { useTranslations } from "next-intl";

export type CardVariant = 'large' | 'compact';

interface PropsCard {
	completed: boolean;
	hasContent: boolean;
	todo: string
	date?: number;
	pinned?: boolean;
	variant: CardVariant;
	onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
}

const ToDoCard = ( {
	hasContent,
	todo,
	date,
	completed = false,
	pinned = false,
	onChange,
	variant = 'large'
}: PropsCard ) => {
	const t = useTranslations();
	
	let getDate = '';
	let styleDate = '';
	if ( date ) {
		getDate = convertTimestampToDate(date);
		if ( getDate === t("uiText.today") ) styleDate = 'today';
		if ( getDate === t("uiText.tomorrow") ) styleDate = 'tomorrow';
	}
	
	return (
		<div
			className={ style.todoCard + ' ' + style[`${ variant }`] + (completed ? ` ${ style.completed }` : '') }>
			<label className={ style.label }>
				<input className={ style.input } onChange={ onChange } checked={ completed } type="checkbox"/>
				<span className={ style.checkmark }></span>
				<span className={ style.todo }>{ todo }</span>
				{ hasContent && <TextLeftIcon className={ style.hasContent }/> }
				<Button className={ `${ style.pin } ${ pinned ? style.pin_active : '' }` } variant={ 'clear' }>
					<PinIcon/>
				</Button>
			</label>
			
			{
				date && (
					<div className={ `${ style.date } ${ style[styleDate] }` }>
						{ getDate === t("uiText.today") && <FlagIcon className={ style.date_red }/> }
						{ getDate === t("uiText.tomorrow") && <FlagIcon className={ style.date_orange }/> }
						{ convertTimestampToDate(date) }
					</div>
				)
			}
		</div>
	);
};

export default ToDoCard;