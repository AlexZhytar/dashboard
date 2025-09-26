import { SearchIcon } from "@/components/UI/Icons/SearchIcon";
import style from "../projects.module.scss";

const ProjectsSearch = () => {
    return ( <div className={style.projects_search}>
        <SearchIcon size={24} className={style.icon_search} />
        <input type="search" placeholder="Search project"/>
    </div> );
}
 
export default ProjectsSearch;