import style from "../projects.module.scss";
import { ProjectsHeadProps } from './types';

const ProjectsHead = ({ list }: ProjectsHeadProps) => {
    return (
        <div className={style.projects_head}>
            {
                list.map((item, index) => <div key={index} className={`${style.projects_head_block} ${style[item.class]}`}>
                    {item.title}
                </div>)
            }

        </div>
    );
}

export default ProjectsHead;