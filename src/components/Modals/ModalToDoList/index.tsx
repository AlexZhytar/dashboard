import React from 'react';
import style from './style.module.scss';
import { Button } from "@/components/UI";
import { useTranslations } from "next-intl";

const ModalToDoList = () => {
	const t = useTranslations();
	
	return (
		<>
			<div className={ style.todoList }>
				modal
			</div>
			<div className={ style.modalActions }>
				<Button variant="primary" className={ style.submit }>
					<span>{ t("modals.toDoList.addToDoButton") }</span>
				</Button>
			</div>
		</>
	);
};

export default ModalToDoList;