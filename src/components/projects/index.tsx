'use client';

import { useEffect } from 'react';
import Container from '../UI/Container';
import style from './projects.module.scss';
import ProjectsHead from './ProjectsHead';
import ProjectsList from './ProjectsList';
import { projectsDefault } from "@/constants";
import { useProjectsStore } from '@/store';
import type { ProjectsList as ProjectType } from './ProjectsList/types';
import ProjectsSettings from './ProjectsSettings';

import ProjectsSearch from './ProjectsSearch';
import { useState, useMemo } from 'react';

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

    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => {
        if (!search.trim()) return projectData.projects;
        return projectData.projects.filter((project: ProjectType) =>
            project.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, projectData.projects]);

    return (
        <div className={style.projects}>
            <Container>
                <div className={style.projects_wrapper}>
                    <ProjectsSearch value={search} onChange={setSearch} />
                    <ProjectsSettings />
                    <ProjectsHead list={projectData.projectsHead} />
                    <ProjectsList projects={filteredProjects} isSearchActive={useProjectsStore(state => state.isSearchActive)} />
                </div>
            </Container>
        </div>
    );
}

export default Projects;