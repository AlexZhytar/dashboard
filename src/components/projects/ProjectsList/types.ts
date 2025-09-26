import { ReactNode } from 'react';
import { LinkCard, ManagerCard } from "../ProjectsCard/types"

export type DraggableBlockProps = {
    id: string | number;
    children: ReactNode;
}

export type ProjectsList = {
    id: string;
    label: string,
    color: string,
    deadline_at: number,
    confirmed_hours: number,
    months_hours: number,
    tracked_hours: number,
    links: LinkCard[],
    manager: ManagerCard[]
}

export type ProjectsProps = {
    projects: ProjectsList[];
}