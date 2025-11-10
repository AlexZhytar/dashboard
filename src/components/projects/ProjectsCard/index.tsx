import React from 'react';
import style from '../projects.module.scss';
import { PropsCard } from './types';
import ProjectCardLinks from './ProjectCardLinks';
import ProjectCardManager from './ProjectCardManager';
import { convertTimestampToDate } from '@/utils/convertTimestampToDate';
import ProjectCardHours from "@/components/projects/ProjectsCard/ProjectCardHours";

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
	
	
	return <div className={ style.projects_card }>
		<div className={ style.projects_card_color }
			 style={ { backgroundColor: !color || color === '' ? 'green' : color } }/>
		<div className={ style.project }>
			<div className={ style.project_block }>{ project }</div>
		</div>
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
		<div className={ style.manager }>
			<div className={ style.manager_block }>
				{ manager.map(user => {
					return <ProjectCardManager
						key={ user.user_id }
						name={ user.name }
						user_id={ user.user_id }/>
				}) }
			</div>
		</div>
		<div className={ style.hours }>
			<div className={ style.hours_block }>
				<ProjectCardHours
					confirmed_hours={ confirmed_hours }
					months_hours={ months_hours }
					tracked_hours={ tracked_hours }/>
			</div>
		</div>
		<div className={ style.todo }>
			<div className={ style.todo_block }>
				<span></span>
			</div>
		</div>
	</div>
}

export default ProjectsCard;