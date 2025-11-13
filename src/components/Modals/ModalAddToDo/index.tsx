import React, { useState } from 'react';
import style from './style.module.scss';
import modals from "../modal.module.scss";
import { useTranslations } from "next-intl";
import { Button, InputText, Textarea } from "@/components/UI";
import { CalendarIcon } from "@/components/Icons";
import { useUserStore } from "@/store";

const ModalAddToDo = () => {
	const [ name, setName ] = useState("");
	const [ desc, setDesc ] = useState("");
	const t = useTranslations();
	const { setModalID } = useUserStore();
	
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
							<Button variant={ 'secondary' }>
								<span>{ t("modals.addToDo.datePicker.today") }</span>
							</Button>
							<Button variant={ 'secondary' }>
								<span>{ t("modals.addToDo.datePicker.tomorrow") }</span>
							</Button>
							<Button variant={ 'secondary' }>
								<CalendarIcon size={ 16 }/>
								<span>{ t("modals.addToDo.datePicker.selectDate") }</span>
							</Button>
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