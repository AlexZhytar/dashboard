'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Container from '../layout/Container';
import style from './projects.module.scss';
import modals from '../Modals/modal.module.scss';
import ProjectsHead from './ProjectsHead';
import ProjectsList, { ProjectsListType } from './ProjectsList';
import { projectsDefault } from "@/constants";
import { useProjectsStore } from '@/store';
import ProjectsSettings from './ProjectsSettings';
import ProjectsSearch from './ProjectsSearch';
import { Modal, ModalToDo, ModalToDoList } from "@/components/Modals";
import { useTranslations } from "next-intl";

const Projects = () => {
	const {
		projectData,
		setProjectData,
		hasHydrated,
		syncProjectsWithDefault
	} = useProjectsStore();
	
	const t = useTranslations();
	
	useEffect(() => {
		if ( !hasHydrated ) return;
		if ( !projectData.projects || projectData.projects.length === 0 ) {
			setProjectData(projectsDefault);
			return;
		}
		syncProjectsWithDefault(projectsDefault.projects);
	}, [ hasHydrated, projectsDefault ]);
	
	const [ search, setSearch ] = useState("");
	
	const filteredProjects = useMemo(() => {
		if ( !search.trim() ) return projectData.projects;
		return projectData.projects.filter(( project: ProjectsListType ) =>
			project.label.toLowerCase().includes(search.toLowerCase())
		);
	}, [ search, projectData.projects ]);
	
	return (
		<div className={ style.projects }>
			<Container>
				<div className={ style.projects_wrapper }>
					<ProjectsSearch value={ search } onChange={ setSearch }/>
					<ProjectsSettings/>
					<ProjectsHead/>
					<ProjectsList projects={ filteredProjects }
								  isSearchActive={ useProjectsStore(state => state.isSearchActive) }/>
				</div>
			</Container>
			
			<Modal id={ 'addToDO' } title={ t('modals.addToDo.title') } animation={ 'center' }>
				<ModalToDo/>
			</Modal>
			
			<Modal id={ 'toDoList' } className={ modals.todoList } title={ t('modals.toDoList.title') }
				   animation={ 'right' }>
				<ModalToDoList/>
			</Modal>
		</div>
	);
}

export default Projects;