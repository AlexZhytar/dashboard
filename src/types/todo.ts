export interface Todos {
	id: number;
	timestamp: number;
	completed: boolean;
	pinned: boolean
	text: string;
	label: string;
}