export const isValidEmail = ( email: string ) => {
	const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
	return re.test(email);
};