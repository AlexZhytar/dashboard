import { LinkCard } from './types';
import style from '../projects.module.scss';

const ProjectCardLinks = ({ icon, url, label }: LinkCard) => <a href={url} target='_blank' className={style.link}>
    <img src={icon} alt="icon" />
    <span>{label}</span>
</a>

export default ProjectCardLinks;