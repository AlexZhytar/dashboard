export const API_BASE_URL = "https://n8n.testsofts.com/webhook/dashboard";

const getUrl = ( path: string ): string => {
	return `${ API_BASE_URL }/v1${ path }`;
};

export const api = {
	// Auth / user
	login: (): string => getUrl("/ws/auth/login"),
	getProfile: (): string => getUrl("/ws/profile"),
	
	// All projects
	getProjects: (): string => {
		return getUrl(`/ws/projects`);
	},
	
	// Project mutations
	createProject: (): string => {
		return getUrl("/ws/projects/create");
	},
	updateProject: ( projectId: string ): string => {
		return getUrl(`/ws/projects/update?project_id=${ encodeURIComponent(projectId) }`);
	},
	deleteProject: (projectId: string): string => {
		return getUrl(`/ws/projects/delete?project_id=${ encodeURIComponent(projectId) }`);
	},
	
	// all users global token
	getUsers: (): string => getUrl("/ws/users"),
	getFilteredUsers: ( search: string ): string => {
		return getUrl(`/api/users?search=${ encodeURIComponent(search) }`);
	},
	
	getFilteredProjects: ( search: string ): string => {
		return getUrl(`/api/projects?search=${ encodeURIComponent(search) }`);
	},
	
	
	// Todos
	getProjectTodos: ( projectId: string ): string => {
		return getUrl(`/ws/todos?project_id=${ projectId }`);
	},
	
	getUserProjectTodos: ( projectId: string, employeeId: string ): string => {
		return getUrl(
			`/management/projects_todos?project_id=${ projectId }&employee_id=${ employeeId }`
		);
	},
	
	// Todo mutations
	createProjectTodo: ( projectId: string ): string => {
		return getUrl(`/management/projects_todos/${ projectId }/create`);
	},
	
	updateProjectTodo: ( projectId: string, todoId: string ): string => {
		return getUrl(`/management/projects_todos/${ projectId }/update/${ todoId }`);
	}
};
