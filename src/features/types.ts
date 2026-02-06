interface UserRole {
	slug: 'pm' | 'developer' | 'designer' | string;
}

export interface UserItem {
	id: string | number;
	first_name: string;
	last_name: string;
	role?: UserRole;
}

export interface UserList {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar_url?: string | null;
	created_at?: string;
	updated_at?: string;
}