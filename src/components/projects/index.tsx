'use client';

import { useEffect } from 'react';
import Container from '../UI/Container';
import style from './projects.module.scss';
import ProjectsHead from './ProjectsHead';
import ProjectsList from './ProjectsList';
import { projectsDefault } from "@/constants";
import { useProjectsStore } from '@/store';
import ProjectsSettings from './ProjectsSettings';
import ProjectsSearch from './ProjectsSearch';

const Projects = () => {
    const {
        projectData,
        setProjectData,
        hasHydrated
    } = useProjectsStore();

    useEffect(() => {
        if (!hasHydrated) return;
        setProjectData(projectsDefault);
    }, [hasHydrated, projectsDefault]);

    return (
        <div className={style.projects}>
            <Container>
                <div className={style.projects_wrapper}>
                    <ProjectsSearch />
                    <ProjectsSettings />
                    <ProjectsHead list={projectData.projectsHead} />
                    <ProjectsList projects={projectData.projects} />
                </div>
            </Container>
        </div>
    );
}

export default Projects;