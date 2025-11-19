export const API_BASE_URL = "https://dashboard-backend.testsofts.com";

const getUrl = ( path: string ): string => {
	return `${ API_BASE_URL }/api${ path }`;
};

export const api = {
	// Auth / user
	login: (): string => getUrl("/employee/login"),
	
	getProfile: (): string => getUrl("/employee/profile"),
	
	// Employees / managers
	getManagers: (): string => getUrl("/management/employees"),
	
	// Projects
	getUserProjects: ( employeeId: number ): string => {
		return getUrl(`/management/projects?employee_id=${ employeeId }`);
	},
	
	// Todos
	getProjectTodos: ( projectId: number ): string => {
		return getUrl(`/management/projects_todos?project_id=${ projectId }`);
	},
	
	getUserProjectTodos: ( projectId: number, employeeId: number ): string => {
		return getUrl(
			`/management/projects_todos?project_id=${ projectId }&employee_id=${ employeeId }`
		);
	},
	
	// Project mutations
	createProject: (): string => {
		return getUrl("/management/projects/create");
	},
	
	updateProject: ( projectId: number ): string => {
		return getUrl(`/management/projects/update/${ projectId }`);
	},
	
	// Todo mutations
	createProjectTodo: ( projectId: number ): string => {
		return getUrl(`/management/projects_todos/${ projectId }/create`);
	},
	
	updateProjectTodo: ( projectId: number, todoId: number ): string => {
		return getUrl(`/management/projects_todos/${ projectId }/update/${ todoId }`);
	}
};
