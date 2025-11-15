import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import modals from "../modal.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { Button, InputText, Textarea } from "@/components/UI";
import { CalendarIcon } from "@/components/Icons";
import { useUserStore } from "@/store";
import { DayPicker } from "react-day-picker";
import { enUS, uk } from "react-day-picker/locale";
import "react-day-picker/style.css";

const startOfDay = ( date: Date ) => {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
};

const isSameDay = ( a?: Date, b?: Date ) => {
	if ( !a || !b ) return false;
	return startOfDay(a).getTime() === startOfDay(b).getTime();
};

const ModalAddToDo = () => {
	const localeCode = useLocale();
	const t = useTranslations();
	const { setModalID } = useUserStore();
	
	const [ caption, setCaption ] = useState("");
	const [ desc, setDesc ] = useState("");
	const [ selectedDate, setSelectedDate ] = useState<Date>();
	const [ openCalendar, setOpenCalendar ] = useState(false);
	
	const dateBlockRef = useRef<HTMLDivElement | null>(null);
	
	const locale = localeCode === "uk" ? uk : enUS;
	
	const today = new Date();
	const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
	
	const handleSelectDate = useCallback(( date: Date | undefined ) => {
		if ( !date ) return;
		setSelectedDate(date);
		setOpenCalendar(false);
	}, []);
	
	const handleSetToday = useCallback(() => {
		setSelectedDate(new Date());
	}, []);
	
	const handleSetTomorrow = useCallback(() => {
		const d = new Date();
		d.setDate(d.getDate() + 1);
		setSelectedDate(d);
	}, []);
	
	useEffect(() => {
		if ( !openCalendar ) return;
		
		const handleClickOutside = ( e: MouseEvent ) => {
			if ( !dateBlockRef.current ) return;
			
			if ( !dateBlockRef.current.contains(e.target as Node) ) {
				setOpenCalendar(false);
			}
		};
		
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [ openCalendar ]);
	
	return (
		<>
			<div className={ style.addToDO }>
				<div className={ style.addToDO_inner }>
					<div className={ `${ modals.field } ${ modals.field_100 }` }>
						<div className={ modals.field_caption }>
							{ t("modals.addToDo.labels.caption") }
						</div>
						<div className={ modals.field_input }>
							<InputText
								name="caption" // було "projectClickup" — копіпаст, виправив під суть поля
								placeholder={ t("modals.addToDo.placeholders.caption") }
								value={ caption }
								onChange={ ( e ) => setCaption(e.target.value) }
							/>
						</div>
					</div>
					
					<div className={ `${ modals.field } ${ modals.field_100 }` }>
						<div className={ modals.field_caption }>
							{ t("modals.addToDo.labels.description") }
						</div>
						<div className={ modals.field_input }>
							<Textarea
								name="description"
								value={ desc }
								placeholder={ t("modals.addToDo.placeholders.description") }
								onChange={ ( e ) => setDesc(e.target.value) }
							/>
						</div>
					</div>
					
					<div className={ `${ modals.field } ${ modals.field_100 }` }>
						<div className={ modals.field_caption }>
							{ t("modals.addToDo.labels.dueDate") }
						</div>
						
						<div className={ modals.field_date }>
							<Button
								variant="secondary"
								className={ isSameDay(selectedDate, today) ? modals.dateActive : "" }
								onClick={ handleSetToday }
							>
								<span>{ t("modals.addToDo.datePicker.today") }</span>
							</Button>
							
							<Button
								variant="secondary"
								className={ isSameDay(selectedDate, tomorrow) ? modals.dateActive : "" }
								onClick={ handleSetTomorrow }
							>
								<span>{ t("modals.addToDo.datePicker.tomorrow") }</span>
							</Button>
							
							<div className={ modals.field_date_block } ref={ dateBlockRef }>
								<Button
									variant="secondary"
									className={ selectedDate ? modals.dateAdded : "" }
									onClick={ () => setOpenCalendar(( prev ) => !prev) }
								>
									<CalendarIcon size={ 16 }/>
									<span>
										{ !selectedDate
											? t("modals.addToDo.datePicker.selectDate")
											: selectedDate.toLocaleDateString() }
									</span>
								</Button>
								
								{ openCalendar && (
									<div className={ modals.field_date_picker }>
										<DayPicker
											mode="single"
											disabled={ { before: startOfDay(today) } }
											selected={ selectedDate }
											onSelect={ handleSelectDate }
											locale={ locale }
											startMonth={ today }
										/>
									</div>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className={ style.modalActions }>
				<Button
					variant="secondary"
					onClick={ () => setModalID(null) }
					className={ style.cancel }
				>
					<span>{ t("uiText.cancel") }</span>
				</Button>
				<Button variant="primary" className={ style.submit }>
					<span>{ t("modals.addToDo.addButton") }</span>
				</Button>
			</div>
		</>
	);
};

export default ModalAddToDo;
