'use client';

import { ManagerCard } from './types';
import style from '../projects.module.scss';
import { getInitials } from '@/utils';
import { Tooltip } from "react-tooltip";
import React from "react";

const ProjectCardManager = ( { first_name, last_name, id }: ManagerCard ) => {
	const initials = getInitials(`${ first_name } ${ last_name }`);
	
	return <div data-user={ id } id={ `manager-${ id }` } className={ style.pm_user }>
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