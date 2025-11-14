import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import modals from "../modal.module.scss";
import { useLocale, useTranslations } from "next-intl";
import { Button, InputText, Textarea } from "@/components/UI";
import { CalendarIcon } from "@/components/Icons";
import { useUserStore } from "@/store";
import { DayPicker } from "react-day-picker";
import { enUS, uk } from "react-day-picker/locale";
import "react-day-picker/style.css";

const ModalAddToDo = () => {
	const current = useLocale();
	const [ name, setName ] = useState("");
	const [ desc, setDesc ] = useState("");
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const [ selectedDate, setSelectedDate ] = useState<Date>();
	const [ openCalendar, setOpenCalendar ] = useState(false);
	const dateBlockRef = useRef<HTMLDivElement | null>(null);
	
	const handleSelectDate = ( date: Date | undefined ) => {
		setSelectedDate(date);
		setOpenCalendar(false);
	};
	
	const isToday = ( date: Date | undefined ) => {
		if ( !date ) return false;
		
		const d = new Date(date);
		const today = new Date();
		
		d.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		
		return d.getTime() === today.getTime();
	};
	
	const isTomorrow = ( date?: Date ) => {
		if ( !date ) return false;
		
		const d = new Date(date);
		const tomorrow = new Date();
		
		d.setHours(0, 0, 0, 0);
		tomorrow.setHours(0, 0, 0, 0);
		tomorrow.setDate(tomorrow.getDate() + 1);
		
		return d.getTime() === tomorrow.getTime();
	};
	
	const setToday = () => {
		setSelectedDate(new Date());
	};
	
	const setTomorrow = () => {
		const d = new Date();
		d.setDate(d.getDate() + 1);
		setSelectedDate(d);
	};
	
	useEffect(() => {
		function handleClickOutside( e: MouseEvent ) {
			if ( !dateBlockRef.current ) return;
			
			if ( !dateBlockRef.current.contains(e.target as Node) ) {
				setOpenCalendar(false);
			}
		}
		
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	
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
								name="projectClickup"
								placeholder={ t("modals.addToDo.placeholders.caption") }
								value={ name }
								onChange={ ( e ) => setName(e.target.value) }/>
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
							<Button variant={ 'secondary' }
									className={ isToday(selectedDate) ? modals.dateActive : '' }
									onClick={ setToday }>
								<span>{ t("modals.addToDo.datePicker.today") }</span>
							</Button>
							<Button variant={ 'secondary' }
									className={ isTomorrow(selectedDate) ? modals.dateActive : '' }
									onClick={ setTomorrow }>
								<span>{ t("modals.addToDo.datePicker.tomorrow") }</span>
							</Button>
							
							<div className={ modals.field_date_block } ref={ dateBlockRef }>
								<Button variant={ 'secondary' }
										className={ selectedDate ? modals.dateAdded : '' }
										onClick={ () => setOpenCalendar(( prev ) => !prev) }
								>
									<CalendarIcon size={ 16 }/>
									<span>
									{ !selectedDate ? t("modals.addToDo.datePicker.selectDate") : selectedDate.toLocaleDateString() }
								</span>
								</Button>
								{
									openCalendar && (
										<>
											<div className={ modals.field_date_picker }>
												<DayPicker
													mode="single"
													disabled={ { before: new Date() } }
													selected={ selectedDate }
													onSelect={ handleSelectDate }
													locale={ current === "uk" ? uk : enUS }
													startMonth={ new Date() }
												/>
											</div>
										</>
									)
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={ style.modalActions }>
				<Button variant="secondary"
						onClick={ () => setModalID(null) }
						className={ style.cancel }>
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