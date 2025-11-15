import style from "./style.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/components/UI";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InputCheckbox from "@/components/UI/InputCheckbox";
import { useProjectsStore, useUserStore } from "@/store";

type FilterKey = "links" | "pm" | "hours" | "todo";
type FiltersState = Record<FilterKey, boolean>;

const DEFAULT_FILTERS: FiltersState = {
	links: true,
	pm: true,
	hours: true,
	todo: true
};

const FILTER_CONFIG: { key: FilterKey; labelKey: string }[] = [
	{ key: "links", labelKey: "modals.settings.links" },
	{ key: "pm", labelKey: "modals.settings.pm" },
	{ key: "hours", labelKey: "modals.settings.hours" },
	{ key: "todo", labelKey: "modals.settings.toDo" }
];

const mapStoreToLocal = ( filters: Partial<FiltersState> | null | undefined ): FiltersState => ({
	links: filters?.links ?? DEFAULT_FILTERS.links,
	pm: filters?.pm ?? DEFAULT_FILTERS.pm,
	hours: filters?.hours ?? DEFAULT_FILTERS.hours,
	todo: filters?.todo ?? DEFAULT_FILTERS.todo
});

const ModalSettings = () => {
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const { filters, setFilter } = useProjectsStore();
	
	const [ localFilters, setLocalFilters ] = useState<FiltersState>(() =>
		mapStoreToLocal(filters)
	);
	
	useEffect(() => {
		setLocalFilters(mapStoreToLocal(filters));
	}, [ filters ]);
	
	const handleLocalToggle = useCallback(( key: FilterKey ) => {
		setLocalFilters(prev => ({
			...prev,
			[key]: !prev[key]
		}));
	}, []);
	
	const hasAnyFalse = useMemo(
		() => Object.values(localFilters).some(v => !v),
		[ localFilters ]
	);
	
	const handleRestoreFilter = useCallback(() => {
		setLocalFilters(DEFAULT_FILTERS);
	}, []);
	
	const handleSaveFilters = useCallback(() => {
		(Object.keys(localFilters) as FilterKey[]).forEach(key => {
			setFilter(key, localFilters[key]);
		});
		setModalID(null);
	}, [ localFilters, setFilter, setModalID ]);
	
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
							{/* фільтр по PM */ }
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
