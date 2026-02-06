'use client';

import style from '../projects.module.scss';
import { getInitials } from '@/utils';
import { Tooltip } from "react-tooltip";
import React from "react";
import { useUserStore } from "@/store";
import { UserItem } from "@/features/types";

const ProjectCardManager = ( { first_name, last_name, id }: UserItem ) => {
	const initials = getInitials(`${ first_name } ${ last_name }`);
	const { setModalID, setManagerID } = useUserStore();
	
	const handleClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {
		e.stopPropagation();
		setManagerID(id);
		setModalID(`manager-${ id }`);
	}
	
	return <div id={ `manager-${ id }` }
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