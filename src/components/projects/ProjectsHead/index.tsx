import style from "../projects.module.scss";
import { useTranslations } from "next-intl";

const ProjectsHead = () => {
	const t = useTranslations();
	
	const projectsHead = [
		{ title: t("projects.tableHead.project"), class: "project" },
		{ title: t("projects.tableHead.links"), class: "links" },
		{ title: t("projects.tableHead.pm"), class: "manager" },
		{ title: t("projects.tableHead.hours"), class: "hours" },
		{ title: t("projects.tableHead.toDo"), class: "todo" },
		{ title: t("projects.tableHead.actions"), class: "actions" }
	]
	
	return (
		<div className={ style.projects_head }>
			{
				projectsHead.map(( item, index ) =>
					<div key={ index }
						 className={ `${ style.projects_head_block } ${ style[item.class] }` }>
						{ item.title }
					</div>
				)
			}
		
		</div>
	);
}

export default ProjectsHead;