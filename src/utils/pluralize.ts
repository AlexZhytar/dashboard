export function pluralizeEn( count: number, singular: string, plural: string ) {
	return count === 1 ? singular : plural;
}

export function pluralizeUa( count: number, forms: [ string, string, string ] ) {
	const lastTwo = count % 100;
	const last = count % 10;
	
	if ( lastTwo >= 11 && lastTwo <= 14 ) {
		return forms[2];
	}
	
	if ( last === 1 ) {
		return forms[0];
	}
	
	if ( last >= 2 && last <= 4 ) {
		return forms[1];
	}
	
	return forms[2];
}