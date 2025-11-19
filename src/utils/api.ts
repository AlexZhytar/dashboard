export const API_BASE_URL = "https://dashboard-backend.testsofts.com";

export const api = {
	// GET requests
	getUrl: ( path: string ) => {
		return `${ API_BASE_URL }/api${ path }`;
	},
	login: (): string => {
		return api.getUrl('/employee/login');
	},
	getProfile: (): string => {
		return api.getUrl('/employee/profile');
	},
	getManagers: (): string => {
		return api.getUrl('/management/employees');
	},
	getUserProjects: ( manager_id: { manager_id: number } ) => {
		return api.getUrl(`/management/projects?&employee_id=${ manager_id }`);
	},
	getProjectTodos: ( project_id: { project_id: number } ) => {
		return api.getUrl(`/management/projects_todos?project_id=${ project_id }`);
	},
	getUserProjectTodos: ( project_id: { project_id: number }, manager_id: { manager_id: number } ) => {
		return api.getUrl(`/management/projects_todos?project_id=${ project_id }&employee_id=${ manager_id }`);
	},
	
	// POST requests
	createProject: (): string => {
		return api.getUrl('/management/projects/create');
	},
	updateProject: ( project_id: { project_id: number } ) => {
		return api.getUrl(`/management/projects/update/${ project_id }`);
	},
	createProjectTodo: ( id: { id: number } ) => {
		return api.getUrl(`/management/projects_todos/${ id }/create`);
	},
	updateProjectTodo: ( project_id: { project_id: number }, todo_id: { todo_id: number } ) => {
		return api.getUrl(`/management/projects_todos/${ project_id }/update/${ todo_id }`);
	}
}