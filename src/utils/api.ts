export const api = {
	getUrl: ( path: string ) => {
		if ( process.env.NODE_ENV === "development" ) {
			return `/api${ path }`;
		}
		return `https://dashboard-backend.testsofts.com/api${ path }`;
	}
}