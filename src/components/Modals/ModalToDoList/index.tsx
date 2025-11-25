import React, { useState } from 'react';
import style from './style.module.scss';
import { Button } from "@/components/UI";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/store";
import { NoResultsIcon } from "@/components/Icons";

const ModalToDoList = () => {
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const [ activeTab, setActiveTab ] = useState<'upcoming' | 'completed'>('upcoming');
	
	return (
		<>
			<div className={ style.todoList }>
				<div className={ style.todoList_nav }>
					<Button variant={ 'clear' }
							className={ `${ style.button_nav } ${ activeTab === 'upcoming' ? style.button_nav_active : '' }` }
							onClick={ () => setActiveTab('upcoming') }>
						<span>{ t("modals.toDoList.tabs.upcoming") }</span>
					</Button>
					<Button variant={ 'clear' }
							className={ `${ style.button_nav } ${ activeTab === 'completed' ? style.button_nav_active : '' }` }
							onClick={ () => setActiveTab('completed') }>
						<span>{ t("modals.toDoList.tabs.completed") }</span>
					</Button>
				</div>
				
				<div className={ style.todoList_body }>
					<div className={ style.todoList_body_empty }>
						<NoResultsIcon size={ 80 } className={ style.no_results_icon }/>
						<span>{ t("modals.toDoList.noToDos") }</span>
					</div>
				</div>
			</div>
			<div className={ style.modalActions }>
				<Button variant="primary"
						onClick={ () => setModalID("addToDO") }
						className={ style.submit }>
					<span>{ t("modals.toDoList.addToDoButton") }</span>
				</Button>
			</div>
		</>
	);
};

export default ModalToDoList;