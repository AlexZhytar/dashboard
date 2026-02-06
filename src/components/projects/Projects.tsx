"use client";

import React, { useMemo, useState } from "react";
import Container from "../layout/Container";
import style from "./projects.module.scss";
import modals from "../Modals/modal.module.scss";
import ProjectsHead from "./ProjectsHead";
import ProjectsList from "./ProjectsList";
import { useProjectsStore, useUserStore } from "@/store";
import ProjectsSettings from "./ProjectsSettings";
import ProjectsSearch from "./ProjectsSearch";
import { Modal, ModalToDo, ModalToDoList, ModalUser } from "@/components/Modals";
import { useTranslations } from "next-intl";
import { useUsers } from "@/features/users";
import { useProjects } from "@/features/projects";

const Projects = () => {
	const t = useTranslations();
	
	const { users } = useUsers();
	const { projects } = useProjects();
	
	const projectOrder = useProjectsStore(( s ) => s.projectOrder);
	const isSearchActive = useProjectsStore(( s ) => s.isSearchActive);
	const pmUserIds = useProjectsStore(( s ) => s.pmUserIds); // ✅ так краще (селектором)
	
	const [ search, setSearch ] = useState("");
	
	const { managerID } = useUserStore();
	
	const order = projectOrder ?? [];
	
	const orderedProjects = useMemo(() => {
		const byId = new Map(projects.map(( p ) => [ String(p.id), p ]));
		
		const ordered = order
			.map(( id ) => byId.get(String(id)))
			.filter(Boolean) as typeof projects;
		
		const rest = projects.filter(( p ) => !order.includes(String(p.id)));
		
		return [ ...ordered, ...rest ];
	}, [ projects, order ]);
	
	const filteredProjects = useMemo(() => {
		let list = orderedProjects;
		
		// 1) Фільтр по PM (assigned_users з role.slug === "pm")
		if ( pmUserIds && pmUserIds.length > 0 ) {
			const pmSet = new Set(pmUserIds.map(String));
			
			list = list.filter(( p ) =>
				Array.isArray((p as any).assigned_users) &&
				(p as any).assigned_users.some(( u: any ) => {
					const isPm = u?.role?.slug === "pm";
					return isPm && pmSet.has(String(u.id));
				})
			);
		}
		
		// 2) Пошук
		const q = search.trim().toLowerCase();
		if ( q ) {
			list = list.filter(( p ) => (p.label ?? "").toLowerCase().includes(q));
		}
		
		return list;
	}, [ orderedProjects, pmUserIds, search ]);
	
	const getClickedManager = users.filter(( m ) => m.id === managerID);
	
	return (
		<div className={ style.projects }>
			<Container>
				<div className={ style.projects_wrapper }>
					<ProjectsSearch value={ search } onChange={ setSearch }/>
					<ProjectsSettings/>
					<ProjectsHead/>
					<ProjectsList projects={ filteredProjects } isSearchActive={ isSearchActive }/>
				</div>
			</Container>
			
			<Modal id={ "addToDO" } title={ t("modals.addToDo.title") } animation={ "center" }>
				<ModalToDo/>
			</Modal>
			
			<Modal
				id={ "toDoList" }
				className={ modals.todoList }
				title={ t("modals.toDoList.title") }
				animation={ "right" }
			>
				<ModalToDoList/>
			</Modal>
			
			<Modal id={ `manager-${ managerID }` } className={ modals.modalUser } animation={ "right" }>
				<ModalUser userInfo={ getClickedManager[0] }/>
			</Modal>
		</div>
	);
};

export default Projects;
