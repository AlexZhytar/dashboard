import style from "../projects.module.scss";
import { useTranslations } from "next-intl";
import { useProjectsStore } from "@/store";

const ProjectsHead = () => {
	const t = useTranslations();
	const { filters } = useProjectsStore();
	
	return (
		<div className={ style.projects_head }>
			<div className={ `${ style.projects_head_block } ${ style.project }` }>
				{ t("projects.tableHead.project") }
			</div>
			{ filters.links && (
				<div className={ `${ style.projects_head_block } ${ style.links }` }>
					{ t("projects.tableHead.links") }
				</div>
			) }
			{ filters.pm && (
				<div className={ `${ style.projects_head_block } ${ style.pm }` }>
					{ t("projects.tableHead.pm") }
				</div>
			) }
			{ filters.hours && (
				<div className={ `${ style.projects_head_block } ${ style.hours }` }>
					{ t("projects.tableHead.hours") }
				</div>
			) }
			{ filters.todo && (
				<div className={ `${ style.projects_head_block } ${ style.todo }` }>
					{ t("projects.tableHead.toDo") }
				</div>
			) }
			<div className={ `${ style.projects_head_block } ${ style.actions }` }>
				{ t("projects.tableHead.actions") }
			</div>
		</div>
	);
}

export default ProjectsHead;