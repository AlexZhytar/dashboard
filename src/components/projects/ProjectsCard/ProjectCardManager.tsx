'use client';

import { ManagerCard } from './types';
import style from '../projects.module.scss';
import { getInitials } from '@/utils';
import { Tooltip } from "react-tooltip";
import React from "react";
import { useUserStore } from "@/store";

const ProjectCardManager = ( { first_name, last_name, id }: ManagerCard ) => {
	const initials = getInitials(`${ first_name } ${ last_name }`);
	const { setModalID } = useUserStore();
	
	const handleClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
		e.stopPropagation();
		setModalID("modal-pm");
	}
	
	return <div data-user={ id }
				id={ `manager-${ id }` }
				onClick={ handleClick }
				className={ style.pm_user }>
		<div className={ style.pm_border }></div>
		<span>{ initials }</span>
		
		<Tooltip anchorSelect={ `#manager-${ id }` }
				 className={ `tooltip` }
				 offset={ 12 }
				 place={ "top" }>
			<div>{ `${ first_name } ${ last_name }` }</div>
		</Tooltip>
	</div>
}

export default ProjectCardManager;