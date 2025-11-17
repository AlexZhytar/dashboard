import style from "@/components/projects/projects.module.scss";
import { CalendarIcon, CheckIcon, ClockIcon } from "@/components/Icons";
import React from "react";
import { useTranslations } from "next-intl";

const ProjectCardHours = ( { confirmed_hours = 0, tracked_hours = 0, months_hours = 0 } ) => {
	const t = useTranslations();
	
	return (
		<>
             <span className={ `${ style.confirmed_hours } ${ confirmed_hours === 0 ? style.inactive : '' }` }>
                    <CheckIcon/>
				 { confirmed_hours } { t("global.times.h") }
                </span>
			<span className={ `${ style.tracked_hours } ${ tracked_hours === 0 ? style.inactive : '' }` }>
                    <ClockIcon/>
				{ tracked_hours } { t("global.times.h") }
                </span>
			<span className={ `${ style.months_hours } ${ months_hours === 0 ? style.inactive : '' }` }>
                    <CalendarIcon/>
				{ months_hours } { t("global.times.h") }
                </span>
		</>
	);
}

export default ProjectCardHours;