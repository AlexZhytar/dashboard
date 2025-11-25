import React, { useState } from 'react';
import style from './style.module.scss';
import { Button } from "@/components/UI";
import { useLocale, useTranslations } from "next-intl";
import { useProjectsStore, useUserStore } from "@/store";
import { NoResultsIcon } from "@/components/Icons";
import { Todos } from "@/components/projects/ProjectsCard/types";
import ToDoCard from "@/components/toDo/ToDoCard";
import { pluralizeEn, pluralizeUa } from "@/utils";

interface Project {
	id: number;
	todos: Todos;
}

const ModalToDoList = () => {
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const [ activeTab, setActiveTab ] = useState<'upcoming' | 'completed'>('upcoming');
	const { projectData, projectID } = useProjectsStore();
	const locale = useLocale();
	
	const getProjectTodos = projectData.projects.find(( project: Project ) => project.id === projectID)?.todos;
	
	const completedTodos = [] as Todos[];
	const upcomingTodos = [] as Todos[];
	getProjectTodos?.forEach(( todo: Todos ) => {
		if ( todo.completed ) completedTodos.push(todo);
		else upcomingTodos.push(todo);
	});
	
	const pluralizeCountTodo = ( count: number ) => {
		if ( count === 0 ) return;
		if ( locale === 'uk' ) {
			return `${ count } ${ pluralizeUa(count, [ "задача", "задачі", "задач" ]) }`;
		} else {
			return `${ count } ${ pluralizeEn(count, 'To Do', 'To Dos') }`;
		}
	}
	
	
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
					{ activeTab === 'upcoming' && (
						<>
							<div className={ style.todoList_caption }>
								{ pluralizeCountTodo(upcomingTodos.length) }
							</div>
							{ upcomingTodos.length === 0 && (
								<div className={ style.todoList_empty }>
									<NoResultsIcon size={ 80 } className={ style.no_results_icon }/>
									<span>{ t("modals.toDoList.noToDos") }</span>
								</div>
							) }
							{
								upcomingTodos.length > 0 && (
									<div className={ style.todoList_items }>
										{
											upcomingTodos.map(item => {
												return (
													<ToDoCard key={ item.id }
															  todo={ item.label }
															  completed={ item.completed }
															  hasContent={ item.text !== '' }
															  date={ item.timestamp }
															  pinned={ item.pinned }
															  onChange={ () => {
															  } }
															  variant="large"
													/>
												);
											})
										}
									</div>
								)
							}
						</>
					) }
					
					{ activeTab === 'completed' && (
						<>
							<div className={ style.todoList_caption }>
								{ pluralizeCountTodo(completedTodos.length) }
							</div>
							{ completedTodos.length === 0 && (
								<div className={ style.todoList_empty }>
									<NoResultsIcon size={ 80 } className={ style.no_results_icon }/>
									<span>{ t("modals.toDoList.noToDos") }</span>
								</div>
							) }
							{
								completedTodos.length > 0 && (
									<div className={ style.todoList_items }>
										{
											completedTodos.map(item => {
												return (
													<ToDoCard key={ item.id }
															  todo={ item.label }
															  completed={ item.completed }
															  hasContent={ item.text !== '' }
															  date={ item.timestamp }
															  pinned={ item.pinned }
															  onChange={ () => {
															  } }
															  variant="large"
													/>
												);
											})
										}
									</div>
								)
							}
						</>
					) }
				
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