import React, { useState } from 'react';
import style from '../projects.module.scss';
import { PropsCard } from './types';
import ProjectCardLinks from './ProjectCardLinks';
import ProjectCardManager from './ProjectCardManager';
import ProjectCardHours from "@/components/projects/ProjectsCard/ProjectCardHours";
import { useProjectsStore, useUserStore } from "@/store";
import { Button } from "@/components/UI";
import { DotsIcon, PlusIcon, RemoveIcon } from "@/components/Icons";
import { ListIcon } from "@/components/Icons/List";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";

const ProjectCard: React.FC<PropsCard> = ( {
	project_id,
	project,
	color,
	links,
	managers,
	tracked_hours,
	confirmed_hours,
	months_hours,
	callbacks
} ) => {
	const { filters } = useProjectsStore();
	const { setModalID } = useUserStore();
	const [ moreList, setMoreList ] = useState(false);
	const t = useTranslations();
	
	const editProject = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, ) => {
		const id = e.currentTarget.dataset.projectId || '';
		setMoreList(false);
		
		if ( callbacks ) {
			callbacks(id);
		}
	}
	
	const toggleMoreList = () => {
		setMoreList(!moreList);
	}
	
	return (
		<>
			<div className={ style.projects_card }>
				<div className={ style.projects_card_color }
					 style={ { backgroundColor: !color || color === '' ? 'var(--color-green)' : color } }/>
				<div className={ style.project }>
					<div className={ style.project_block }>{ project }</div>
				</div>
				
				{ filters.links && (
					<div className={ style.links }>
						<div className={ style.links_block }>
							{
								links.map(( item, index ) => {
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
							{ managers.map(user => {
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
						<div className={ style.todo_block }>
							<span>toDO</span>
						</div>
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
								onClick={ () => setModalID('toDoList') }
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
						
						<div className={ style.actions_block_more }>
							<Button type={ 'button' }
									onClick={ toggleMoreList }
									className={ `${ style.btnMore } ${ moreList ? style.btnMore_active : '' }` }
									variant={ 'secondary' }>
								<DotsIcon/>
							</Button>
							{
								moreList && (
									<div className={ style.moreList }>
										<Button type={ 'button' }
												className={ `${ style.moreList_remove }` }
												data-project-id={ project_id }
												variant={ 'clear' }>
											<RemoveIcon/>
										</Button>
										<Button type={ 'button' }
												className={ `${ style.moreList_edit }` }
												data-project-id={ project_id }
												onClick={ e => editProject(e) }
												variant={ 'clear' }>
											<span>{ t("uiText.editProject") }</span>
										</Button>
									</div>
								)
							}
						</div>
					</div>
				</div>
			
			</div>
		</>
	)
}

export default ProjectCard;