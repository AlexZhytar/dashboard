import React from 'react';
import style from '../projects.module.scss';
import { PropsCard } from './types';
import ProjectCardLinks from './ProjectCardLinks';
import ProjectCardManager from './ProjectCardManager';
import { convertTimestampToDate } from '@/utils/convertTimestampToDate';
import { CheckIcon, ClockIcon, CalendarIcon } from '@/components/UI/Icons';

const ProjectsCard: React.FC<PropsCard> = ({ project, color, links, manager, deadline, tracked_hours, confirmed_hours, months_hours }) => {
    const finalDateProject = convertTimestampToDate(deadline);


    return <div className={style.projects_card}>
        <div className={style.projects_card_color} style={{ backgroundColor: !color || color === '' ? 'green' : color }} />
        <div className={style.project}>
            <div className={style.project_block}>{project}</div>
        </div>
        <div className={style.links}>
            <div className={style.links_block}>
                {
                    links.map((item, index) => {
                        return <ProjectCardLinks icon={item.icon}
                            key={index}
                            url={item.url}
                            label={item.label}
                        />
                    })
                }
            </div>
        </div>
        <div className={style.manager}>
            <div className={style.manager_block}>
                {manager.map(user => {
                    return <ProjectCardManager
                        key={user.user_id}
                        name={user.name}
                        user_id={user.user_id} />
                })}
            </div>
        </div>
        <div className={style.hours}>
            <div className={style.hours_block}>
                <span className={style.confirmed_hours}>
                    <CheckIcon />
                    {confirmed_hours} h
                </span>
                <span className={style.tracked_hours}>
                    <ClockIcon />
                    {tracked_hours} h
                </span>
                <span className={style.months_hours}>
                    <CalendarIcon />
                    {months_hours} h
                </span>
            </div>
        </div>
        <div className={style.deadline}>
            <div className={style.deadline_block}>
                <span>{finalDateProject}</span>
            </div>
        </div>
        <div className={style.todo}>
            <div className={style.todo_block}>
                <span></span>
            </div>
        </div>
    </div>
}

export default ProjectsCard;