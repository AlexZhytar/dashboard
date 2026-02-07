// Типи даних для користувачів та ролей
import { Project } from "@/features/user/useUserProjects";

export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email?: string;
	avatar_url?: string | null;
	role?: UserRole;
	
	[key: string]: unknown;
}

// Роль користувача (наприклад, для assigned_users у проекті)
export interface UserRole {
	slug: 'pm' | 'developer' | 'designer' | string;
}

// Для списку користувачів (наприклад, у фільтрі PM)
export interface UserItem {
	id: number;
	first_name: string;
	last_name: string;
	role?: UserRole;
}

// Відповідь від API при отриманні даних поточного користувача
export interface GetUserResponse {
	data: User | null;
}

export interface GetUserProjectsResponse {
	data: Project[];
}