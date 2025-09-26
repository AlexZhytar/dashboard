'use client';

import { ManagerCard } from './types';
import style from '../projects.module.scss';
import { getInitials } from '@/utils';

const ProjectCardManager = ({ name, user_id }: ManagerCard) => {
    const initials = getInitials(name);
    
    return <div data-user={user_id} className={style.manager_user}>
        <span>{initials}</span>
    </div>
}

export default ProjectCardManager;