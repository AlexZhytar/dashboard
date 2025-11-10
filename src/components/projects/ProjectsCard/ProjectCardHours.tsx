import style from "@/components/projects/projects.module.scss";
import { CalendarIcon, CheckIcon, ClockIcon } from "@/components/Icons";
import React from "react";
import { useTranslations } from "next-intl";

const ProjectCardHours = ( { confirmed_hours = 0, tracked_hours = 0, months_hours = 0 } ) => {
	const t = useTranslations();
	
	return (
		<>
             <span className={ style.confirmed_hours }>
                    <CheckIcon/>
				 { confirmed_hours } { t("global.times.h") }
                </span>
			<span className={ style.tracked_hours }>
                    <ClockIcon/>
				{ tracked_hours } { t("global.times.h") }
                </span>
			<span className={ style.months_hours }>
                    <CalendarIcon/>
				{ months_hours } { t("global.times.h") }
                </span>
		</>
	);
}

export default ProjectCardHours;