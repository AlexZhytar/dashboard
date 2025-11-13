export const API_BASE_URL = "https://dashboard-backend.testsofts.com";

export const api = {
	getUrl: ( path: string ) => {
		return `${ API_BASE_URL }/api${ path }`;
	},
	login: () => {
		return api.getUrl('/employee/login');
	},
	getProfile: () => {
		return api.getUrl('/employee/profile');
	},
	getManagers: () => {
		return api.getUrl('/management/employees');
	}
	
}