"use client";

import React, { useEffect, useRef, useState } from 'react';
import style from '../projects.module.scss';
import { PropsCard } from '@/types/project';
import { Todos } from '@/types/todo';
import ProjectCardLinks from './ProjectCardLinks';
import ProjectCardManager from './ProjectCardManager';
import ProjectCardHours from "@/components/projects/ProjectsCard/ProjectCardHours";
import { useProjectsStore, useUserStore } from "@/store";
import { Button } from "@/components/UI";
import { DotsIcon, PencilIcon, PlusIcon, RemoveIcon } from "@/components/Icons";
import { ListIcon } from "@/components/Icons/List";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import ToDoCard from "@/components/toDo/ToDoCard";
import { useUuid } from "@/hooks";

const ProjectCard: React.FC<PropsCard> = ( {
	id,
	label,
	color,
	project_links,
	assigned_users,
	todos,
	tracked_hours,
	confirmed_hours,
	months_hours,
	callbacks
} ) => {
	const filters = useProjectsStore(s => s.filters);
	const setActiveProjectId = useProjectsStore(s => s.setActiveProjectId);
	const { setModalID } = useUserStore();
	const t = useTranslations();
	const [ isOpen, setIsOpen ] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const { uuid } = useUuid();
	
	const editProject = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ) => {
		const id = e.currentTarget.dataset.projectId || '';
		const modalType = e.currentTarget.dataset.modalType || '';
		
		setIsOpen(false);
		
		callbacks?.({
			modalType,
			project_id: id,
		});
	}
	
	const handleOpenTodoList = ( e: React.MouseEvent<HTMLButtonElement> ) => {
		e.preventDefault();
		console.log(id)
		setActiveProjectId(id);
		setModalID("toDoList");
	}
	
	useEffect(() => {
		const handleClickOutside = ( e: MouseEvent ) => {
			if ( wrapperRef.current && !wrapperRef.current.contains(e.target as Node) ) {
				setIsOpen(false);
			}
		};
		
		document.addEventListener("pointerdown", handleClickOutside);
		
		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, []);
	
	const todoEmpty = () => {
		return (
			<div className={ style.todo_empty }>
				{ t("uiText.noToDos") }
			</div>
		)
	}
	
	const getTopTodos = ( todos: Todos[] | undefined, limit = 3 ): Todos[] => {
		if ( !Array.isArray(todos) ) return [];
		
		const getDayPriority = ( ts: number | string | undefined ): number => {
			const n = Number(ts);
			if ( !isFinite(n) ) return 2; // other
			const date = new Date(n);
			const now = new Date();
			
			if (
				date.getFullYear() === now.getFullYear() &&
				date.getMonth() === now.getMonth() &&
				date.getDate() === now.getDate()
			) return 0; // today
			
			const tomorrow = new Date(now);
			tomorrow.setDate(now.getDate() + 1);
			if (
				date.getFullYear() === tomorrow.getFullYear() &&
				date.getMonth() === tomorrow.getMonth() &&
				date.getDate() === tomorrow.getDate()
			) return 1; // tomorrow
			
			return 2; // other
		};
		
		return todos
			.filter(todo => !todo.completed)
			.slice()
			.sort(( a, b ) => {
				const dayA = getDayPriority(a.timestamp);
				const dayB = getDayPriority(b.timestamp);
				if ( dayA !== dayB ) return dayA - dayB; // today -> tomorrow -> other
				
				const pinA = a.pinned ? 0 : 1;
				const pinB = b.pinned ? 0 : 1;
				if ( pinA !== pinB ) return pinA - pinB; // pinned first
				
				const ta = Number(a.timestamp) || 0;
				const tb = Number(b.timestamp) || 0;
				return ta - tb; // earlier dates first
			})
			.slice(0, limit);
	};
	
	const pinnedTodos = getTopTodos(todos);
	const pmUsers = assigned_users.filter(u => u.role?.slug === "pm");
	
	return (
		<>
			<div className={ style.projects_card } onMouseLeave={ () => setIsOpen(false) }>
				<div className={ style.projects_card_color }
					 style={ { backgroundColor: !color || color === '' ? 'var(--color-green)' : color } }/>
				<div className={ style.project }>
					<div className={ style.project_block }>{ label }</div>
				</div>
				
				{ filters.links && (
					<div className={ style.links }>
						<div className={ style.links_block }>
							{
								project_links?.map(( item, index ) => {
									return <ProjectCardLinks icon={ item.icon }
															 key={ index }
															 url={ item.url }
															 label={ item.label }
									/>
								})
							}
						</div>
					</div>
				) }
				
				{ filters.pm && (
					<div className={ style.pm }>
						<div className={ style.pm_block }>
							{ (pmUsers ?? []).map(user => {
								return (
									<ProjectCardManager
										key={ user.id }
										first_name={ user.first_name }
										last_name={ user.last_name }
										id={ user.id }/>
								)
							}) }
						</div>
					</div>
				) }
				
				{ filters.hours && (
					<div className={ style.hours }>
						<div className={ style.hours_block }>
							<ProjectCardHours
								confirmed_hours={ confirmed_hours }
								months_hours={ months_hours }
								tracked_hours={ tracked_hours }/>
						</div>
					</div>
				) }
				
				{ filters.todo && (
					<div className={ style.todo }>
						{
							todos && (
								<div className={ style.todo_cards }>
									{
										pinnedTodos.length > 0 && pinnedTodos.map(todo => (
											<ToDoCard
												key={ todo.id }
												todo={ todo.label }
												completed={ todo.completed }
												hasContent={ todo.text !== '' }
												date={ todo.timestamp }
												pinned={ todo.pinned }
												onChange={ () => {
												} }
												variant="compact"
											/>
										))
									}
									{ todos.length === 0 && todoEmpty() }
								</div>
							)
						}
						{ !todos && todoEmpty() }
					</div>
				) }
				
				<div className={ style.actions }>
					<div className={ style.actions_block }>
						<Button type={ 'button' }
								id={ 'button-addToDo' }
								onClick={ () => setModalID('addToDO') }
								className={ `${ style.actions_button } ${ style.actions_btnAdd }` }
								variant={ 'secondary' }>
							<PlusIcon/>
							
							<Tooltip anchorSelect={ `#button-addToDo` }
									 className={ `tooltip` }
									 offset={ 16 }
									 place={ "bottom-end" }>
								<div>{ t("uiText.createToDo") }</div>
							</Tooltip>
						</Button>
						<Button type={ 'button' }
								id={ 'button-toDoList' }
								onClick={ e => handleOpenTodoList(e) }
								className={ `${ style.actions_button }` }
								variant={ 'secondary' }>
							<ListIcon/>
							<Tooltip anchorSelect={ `#button-toDoList` }
									 className={ `tooltip` }
									 offset={ 16 }
									 place={ "bottom-end" }>
								<div>{ t("uiText.todoList") }</div>
							</Tooltip>
						</Button>
						
						<div className={ style.actions_block_more } ref={ wrapperRef }>
							<Button type={ 'button' }
									id={ `list-${ uuid }` }
									onMouseEnter={ () => setIsOpen(true) }
									onClick={ () => setIsOpen(v => !v) }
									className={ `${ style.btnMore } ` }
									variant={ 'secondary' }>
								<DotsIcon/>
							</Button>
							
							<Tooltip anchorSelect={ `#list-${ uuid }` }
									 className={ `tooltip ${ isOpen ? 'active' : '' }` }
									 offset={ 2 }
									 isOpen={ isOpen }
									 place={ "left" }>
								<div className={ style.moreList }>
									<Button type={ 'button' }
											className={ `${ style.moreList_remove }` }
											data-project-id={ id }
											data-modal-type={ 'delete' }
											onClick={ e => editProject(e) }
											variant={ 'secondary' }>
										<RemoveIcon size={ 14 }/>
										<span>{ t("uiText.deleteProject") }</span>
									</Button>
									<Button type={ 'button' }
											className={ `${ style.moreList_edit }` }
											data-project-id={ id }
											data-modal-type={ 'edit' }
											onClick={ e => editProject(e) }
											variant={ 'primary' }>
										<PencilIcon size={ 14 }/>
										<span>{ t("uiText.editProject") }</span>
									</Button>
								</div>
							</Tooltip>
						
						</div>
					</div>
				</div>
			
			</div>
		</>
	)
}

export default ProjectCard;