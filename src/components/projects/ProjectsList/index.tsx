"use client";

import style from "../projects.module.scss";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useProjectsStore } from '@/store/useProjects';
import { NoResultsIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import ProjectCard from "../ProjectsCard";
import { Modal, ModalProject, ModalRemoveProject } from "@/components/Modals";
import modals from "@/components/Modals/modal.module.scss";
import React, { useState } from "react";
import { useUserStore } from "@/store";
import { CallbackPayload, DraggableBlockProps, ProjectsProps, PropsCard } from "../types"

const DraggableBlock = ( { id, children, stateSearch }: DraggableBlockProps ) => {
	const { attributes, listeners, transition, isDragging, setNodeRef, transform } = useSortable({
		id: id.toString(),
	});
	
	const styleDraggable = {
		transform: transform
			? `translate(0px, ${ transform.y }px) scale(1, 1)`
			: `translate(0px, 0px) scale(1, 1)`,
		transition,
		zIndex: isDragging ? 999 : undefined,
		boxShadow: isDragging ? `0px 0px 6px rgba(0, 0, 0, 0.15)` : undefined,
	};
	return (
		<div
			ref={ setNodeRef }
			className={ `${ style.draggable_block }` }
			style={ styleDraggable }
		>
			{
				!stateSearch && <div className={ style.drag_handle } { ...listeners } { ...attributes }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M9.25 16.25C9.94036 16.25 10.5 16.8096 10.5 17.5C10.5 18.1904 9.94036 18.75 9.25 18.75C8.55964 18.75 8 18.1904 8 17.5C8 16.8096 8.55964 16.25 9.25 16.25ZM14.75 16.25C15.4404 16.25 16 16.8096 16 17.5C16 18.1904 15.4404 18.75 14.75 18.75C14.0596 18.75 13.5 18.1904 13.5 17.5C13.5 16.8096 14.0596 16.25 14.75 16.25ZM9.25 10.75C9.94036 10.75 10.5 11.3096 10.5 12C10.5 12.6904 9.94036 13.25 9.25 13.25C8.55964 13.25 8 12.6904 8 12C8 11.3096 8.55964 10.75 9.25 10.75ZM14.75 10.75C15.4404 10.75 16 11.3096 16 12C16 12.6904 15.4404 13.25 14.75 13.25C14.0596 13.25 13.5 12.6904 13.5 12C13.5 11.3096 14.0596 10.75 14.75 10.75ZM9.25 5.25C9.94036 5.25 10.5 5.80964 10.5 6.5C10.5 7.19036 9.94036 7.75 9.25 7.75C8.55964 7.75 8 7.19036 8 6.5C8 5.80964 8.55964 5.25 9.25 5.25ZM14.75 5.25C15.4404 5.25 16 5.80964 16 6.5C16 7.19036 15.4404 7.75 14.75 7.75C14.0596 7.75 13.5 7.19036 13.5 6.5C13.5 5.80964 14.0596 5.25 14.75 5.25Z"/>
                </svg>
              </div>
			}
			{ children }
		</div>
	);
};

const ProjectsList = ( { projects, isSearchActive }: ProjectsProps ) => {
	const { setModalID } = useUserStore();
	const t = useTranslations();
	
	const projectOrder = useProjectsStore(s => s.projectOrder);
	const setProjectOrder = useProjectsStore(s => s.setProjectOrder);
	
	const [ selectedProject, setSelectedProject ] = useState<PropsCard | undefined>();
	
	const handleDragEnd = ( event: DragEndEvent ) => {
		if ( isSearchActive ) return;
		
		const { active, over } = event;
		if ( !over || active.id === over.id ) return;
		
		const activeId = String(active.id);
		const overId = String(over.id);
		
		const ids = projects.map(p => p.id);
		const oldIndex = ids.indexOf(Number(activeId));
		const newIndex = ids.indexOf(Number(overId));
		
		if ( oldIndex === -1 || newIndex === -1 ) return;
		
		const nextIds = arrayMove(ids, oldIndex, newIndex);
		setProjectOrder(nextIds); // зберігаємо тільки порядок
	};
	
	const handleProjectAction = ( action: CallbackPayload ) => {
		const p = projects.find(x => String(x.id) === (action.project_id));
		setSelectedProject(p);
		setModalID(`${ action.modalType }-${ action.project_id }`);
	};
	
	return (
		<>
			<DndContext
				onDragEnd={ isSearchActive ? undefined : handleDragEnd }
				modifiers={ [ restrictToVerticalAxis, restrictToParentElement ] }
			>
				<SortableContext
					items={ projects.map(p => String(p.id)) }
					strategy={ verticalListSortingStrategy }
				>
					<div className={ style.projects_list }>
						{ projects.length === 0 && isSearchActive && (
							<div className={ style.projects_empty }>
								<NoResultsIcon size={ 80 } className={ style.no_results_icon }/>
								<span>{ t("projects.search.noResults") }</span>
							</div>
						) }
						
						{ projects.map(item => (
							<DraggableBlock key={ item.id } id={ item.id } stateSearch={ !!isSearchActive }>
								<ProjectCard { ...item } callbacks={ handleProjectAction }/>
							</DraggableBlock>
						)) }
					</div>
				</SortableContext>
			</DndContext>
			
			<Modal id={ `edit-${ selectedProject?.id ?? "" }` } className={ modals.editProject }
				   title={ t("modals.editProject.title") } animation="center">
				<ModalProject mode="edit" project={ selectedProject }/>
			</Modal>
			
			<Modal id={ `delete-${ selectedProject?.id ?? "" }` } className={ modals.removeProject }
				   title={ t("modals.deleteProject.title") } animation="center">
				<ModalRemoveProject projectID={ Number(selectedProject?.id) } project_name={ selectedProject?.label || "" }/>
			</Modal>
		</>
	);
};

export default ProjectsList;