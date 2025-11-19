import { useTranslations } from "next-intl";

export const convertTimestampToDate = ( timestamp: number ): string => {
	const date = new Date(Number(timestamp));
	const now = new Date();
	const t = useTranslations();
	
	//console.log(new Date('2025-12-23T00:00:00Z').getTime());
	
	if (
		date.getFullYear() === now.getFullYear() &&
		date.getMonth() === now.getMonth() &&
		date.getDate() === now.getDate()
	) {
		return t("uiText.today");
	}
	
	const tomorrow = new Date(now);
	tomorrow.setDate(now.getDate() + 1);
	if (
		date.getFullYear() === tomorrow.getFullYear() &&
		date.getMonth() === tomorrow.getMonth() &&
		date.getDate() === tomorrow.getDate()
	) {
		return t("uiText.tomorrow");
	}
	
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getUTCFullYear();
	return `${ day }.${ month }.${ year }`;
}