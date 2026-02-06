import { ReactNode } from "react";
import { UserItem } from "@/features/types";

export type LinkCard = {
	url: string;
	icon: string;
	label: string;
}

export type Todos = {
	id: number;
	timestamp: number;
	completed: boolean;
	pinned: boolean
	text: string;
	label: string;
}

export interface CallbackPayload {
	modalType: string;
	project_id: string;
}

export type PropsCard = {
	id: number;
	label: string;
	color: string;
	assigned_users: UserItem[];
	links?: LinkCard[];
	todos?: Todos[];
	everhour_id?: string;
	confirmed_hours: number,
	months_hours: number,
	tracked_hours: number,
	callbacks?: ( payload: CallbackPayload ) => void;
}

export type DraggableBlockProps = {
	id: number;
	children: ReactNode;
	stateSearch: boolean;
}

export type ProjectsProps = {
	projects: PropsCard[];
	isSearchActive?: boolean;
}