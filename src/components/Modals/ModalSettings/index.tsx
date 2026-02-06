"use client";

import style from "./style.module.scss";
import { useTranslations } from "next-intl";
import { Button, InputAssignee } from "@/components/UI";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputCheckbox from "@/components/UI/InputCheckbox";
import { useProjectsStore, useUserStore } from "@/store";
import { useUsers } from "@/features/users";

type FilterKey = "links" | "pm" | "hours" | "todo";
type FiltersState = Record<FilterKey, boolean>;

const DEFAULT_FILTERS: FiltersState = {
	links: true,
	pm: true,
	hours: true,
	todo: true,
};

const FILTER_CONFIG: { key: FilterKey; labelKey: string }[] = [
	{ key: "links", labelKey: "modals.settings.links" },
	{ key: "pm", labelKey: "modals.settings.pm" },
	{ key: "hours", labelKey: "modals.settings.hours" },
	{ key: "todo", labelKey: "modals.settings.toDo" },
];

const mapStoreToLocal = (
	filters: Partial<FiltersState> | null | undefined
): FiltersState => ({
	links: filters?.links ?? DEFAULT_FILTERS.links,
	pm: filters?.pm ?? DEFAULT_FILTERS.pm,
	hours: filters?.hours ?? DEFAULT_FILTERS.hours,
	todo: filters?.todo ?? DEFAULT_FILTERS.todo,
});

const ModalSettings = () => {
	const t = useTranslations();
	const { setModalID } = useUserStore();
	
	const { users } = useUsers();
	const { filters, setFilter, pmUserIds, setPmUserIds } = useProjectsStore();
	
	const [ localFilters, setLocalFilters ] = useState<FiltersState>(() =>
		mapStoreToLocal(filters)
	);
	
	const [ localPMIds, setLocalPMIds ] = useState<number[]>(() =>
		(pmUserIds ?? []).map(Number)
	);
	
	useEffect(() => {
		setLocalFilters(mapStoreToLocal(filters));
	}, [ filters ]);
	
	useEffect(() => {
		setLocalPMIds((pmUserIds ?? []).map(Number));
	}, [ pmUserIds ]);
	
	const handleLocalToggle = useCallback(( key: FilterKey ) => {
		setLocalFilters(( prev ) => ({
			...prev,
			[key]: !prev[key],
		}));
	}, []);
	
	const isAllPMChecked = useMemo(() => localPMIds.length === 0, [ localPMIds ]);
	
	const handleSelectAllPM = useCallback(() => {
		setLocalPMIds([]);
	}, []);
	
	const togglePM = useCallback(( id: number ) => {
		setLocalPMIds(( prev ) =>
			prev.includes(id) ? prev.filter(( x ) => x !== id) : [ ...prev, id ]
		);
	}, []);
	
	const hasAnyFalse = useMemo(
		() => Object.values(localFilters).some(( v ) => !v),
		[ localFilters ]
	);
	
	const handleRestoreFilter = useCallback(() => {
		setLocalFilters(DEFAULT_FILTERS);
	}, []);
	
	const handleSaveFilters = useCallback(() => {
		(Object.keys(localFilters) as FilterKey[]).forEach(( key ) => {
			setFilter(key, localFilters[key]);
		});
		
		setPmUserIds(localPMIds);
		setModalID(null);
	}, [ localFilters, localPMIds, setFilter, setPmUserIds, setModalID ]);
	
	const pmUsers = useMemo(
		() => (Array.isArray(users) ? users.filter(( u ) => u.role?.slug === "pm") : []),
		[ users ]
	);
	
	return (
		<>
			<div className={ style.modalSettings }>
				<div className={ style.settingsBlock }>
					<div className={ style.settingsBlock_title }>
						{ t("modals.settings.filters") }
					</div>
					
					<div className={ style.settingsBlock_filter }>
						<div className={ style.filterCaption }>
							{ t("modals.settings.projectManager") }
						</div>
						
						<div className={ style.filterList }>
							{/* ALL */ }
							<InputAssignee
								key="all"
								inputName="projectAssignee-all"
								first_name={ t("uiText.all") }
								last_name=""
								idUser="all"
								checked={ isAllPMChecked }
								onChange={ handleSelectAllPM }
							/>
							
							{ pmUsers.map(( user ) => {
								const id = user.id;
								const checked = localPMIds.includes(id);
								
								return (
									<InputAssignee
										key={ id }
										inputName={ `projectAssignee-${ id }` }
										first_name={ user.first_name }
										last_name={ user.last_name }
										idUser={ id }
										checked={ checked }
										onChange={ () => togglePM(id) }
									/>
								);
							}) }
						</div>
					</div>
				</div>
				
				<div className={ style.settingsBlock }>
					<div className={ style.settingsBlock_title }>
						{ t("modals.settings.tableInfo") }
					</div>
					
					<div className={ style.settingsBlock_filter }>
						{ FILTER_CONFIG.map(( { key, labelKey } ) => (
							<InputCheckbox
								key={ key }
								value={ t(labelKey) }
								inputName="table-info"
								checked={ localFilters[key] }
								onChange={ () => handleLocalToggle(key) }
							/>
						)) }
					</div>
					
					{ hasAnyFalse && (
						<Button variant="secondary" onClick={ handleRestoreFilter }>
							<span>{ t("uiText.reset") }</span>
						</Button>
					) }
				</div>
			</div>
			
			<div className={ style.modalActions }>
				<Button
					variant="primary"
					onClick={ handleSaveFilters }
					className={ style.submit }
				>
					<span>{ t("uiText.save") }</span>
				</Button>
			</div>
		</>
	);
};

export default ModalSettings;
