export type LinkCard = {
	url: string;
	icon: string;
	label: string;
}

export type ManagerCard = {
	first_name: string;
	last_name: string;
	id: number;
}

export type Todos = {
	id: number;
	timestamp: number;
	completed: boolean;
	pinned: boolean
	text: string;
	label: string;
}

export type PropsCard = {
	project_id: string;
	project: string;
	color: string;
	managers: ManagerCard[];
	links: LinkCard[];
	todos?: Todos[];
	confirmed_hours: number,
	months_hours: number,
	tracked_hours: number,
	callbacks?: ( projectId: string ) => void;
}