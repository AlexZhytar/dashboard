import React from 'react';
import style from '../projects.module.scss';
import { PropsCard } from './types';
import ProjectCardLinks from './ProjectCardLinks';
import ProjectCardManager from './ProjectCardManager';
import { convertTimestampToDate } from '@/utils/convertTimestampToDate';
import ProjectCardHours from "@/components/projects/ProjectsCard/ProjectCardHours";
import { useProjectsStore } from "@/store";

const ProjectsCard: React.FC<PropsCard> = ( {
	project,
	color,
	links,
	manager,
	deadline,
	tracked_hours,
	confirmed_hours,
	months_hours
} ) => {
	const finalDateProject = convertTimestampToDate(deadline);
	const { filters } = useProjectsStore();
	
	
	return <div className={ style.projects_card }>
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
					{ manager.map(user => {
						return <ProjectCardManager
							key={ user.user_id }
							name={ user.name }
							user_id={ user.user_id }/>
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
				<span>wazaaa!</span>
			</div>
		</div>
	
	</div>
}

export default ProjectsCard;