import { ReactNode } from "react";
import { UserItem } from "./user";
import { Todos } from "./todo";

export interface Project {
	id: number;
	label: string;
	color?: string;
	assigned_users: UserItem[];
	project_links?: LinkCard[];
	todos?: Todos[];
	everhour_id?: string;
	confirmed_hours?: number,
	months_hours?: number,
	tracked_hours?: number,
	created_at?: string | null,
	deadline_at?: string | null,
	description?: string | null;
	updated_at?: string | null;
	
	[key: string]: unknown;
}

export type PropsCard = {
	id: number;
	label: string;
	color?: string;
	assigned_users: UserItem[];
	project_links?: LinkCard[];
	todos?: Todos[];
	everhour_id?: string;
	confirmed_hours?: number,
	months_hours?: number,
	tracked_hours?: number,
	callbacks?: ( payload: CallbackPayload ) => void;
}

export type LinkCard = {
	url: string;
	icon: string;
	label: string;
}

export interface CallbackPayload {
	modalType: string;
	project_id: string;
}

export type DraggableBlockProps = {
	id: number;
	children: ReactNode;
	stateSearch: boolean;
}

export type ProjectsProps = {
	projects: Project[];
	isSearchActive?: boolean;
}