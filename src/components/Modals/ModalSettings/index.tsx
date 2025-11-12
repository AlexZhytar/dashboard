import style from "./modal-settings.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/components/UI";
import React, { useEffect, useState } from "react";
import InputCheckbox from "@/components/UI/InputCheckbox";
import { useProjectsStore, useUserStore } from "@/store";

type FilterKey = "links" | "pm" | "hours" | "todo";
type LocalFilters = Record<FilterKey, boolean>;

const ModalSettings = () => {
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const { filters, setFilter } = useProjectsStore();
	
	const [ localFilters, setLocalFilters ] = useState<LocalFilters>({
		links: true,
		pm: true,
		hours: true,
		todo: true,
	});
	
	useEffect(() => {
		setLocalFilters({
			links: Boolean(filters?.links),
			pm: Boolean(filters?.pm),
			hours: Boolean(filters?.hours),
			todo: Boolean(filters?.todo),
		});
	}, [ filters ]);
	
	const handleLocalToggle = ( key: FilterKey ) => {
		setLocalFilters(( prev ) => ({ ...prev, [key]: !prev[key] }));
	};
	
	const hasAnyFalse = Object.values(localFilters).some(( v ) => v === false);
	
	const handleRestoreFilter = () => {
		setLocalFilters({
			links: true,
			pm: true,
			hours: true,
			todo: true,
		});
	};
	
	const handleSaveFilters = () => {
		(Object.keys(localFilters) as FilterKey[]).forEach(( key ) => {
			setFilter(key, localFilters[key]);
		});
		setModalID(null);
	}
	
	return (<>
			<div className={ style.modalSettings }>
				<div className={ style.settingsBlock }>
					<div className={ style.settingsBlock_title }>
						{ t("modals.settings.filters") }
					</div>
					<div className={ style.settingsBlock_filter }>
						<div className={ style.filterCaption }>{ t("modals.settings.projectManager") }</div>
						<div className={ style.filterList }>
							{/*<InputAssignee inputName={ "filter-manager" }*/ }
							{/*			   userName={ "All" }*/ }
							{/*			   onChange={ }*/ }
							{/*			   idUser={ 'user-1' }/>*/ }
							{/*<InputAssignee inputName={ "filter-manager" }*/ }
							{/*			   userName={ "Dmytro Koval" }*/ }
							{/*			   onChange={ }*/ }
							{/*			   idUser={ 'user-2' }/>*/ }
							{/*<InputAssignee inputName={ "filter-manager" }*/ }
							{/*			   userName={ "Anna Mantrova" }*/ }
							{/*			   onChange={ }*/ }
							{/*			   idUser={ 'user-3' }/>*/ }
							{/*<InputAssignee inputName={ "filter-manager" }*/ }
							{/*			   userName={ "Heorhii Popov" }*/ }
							{/*			   onChange={ }*/ }
							{/*			   idUser={ 'user-4' }/>*/ }
						</div>
					</div>
				
				</div>
				
				<div className={ style.settingsBlock }>
					<div className={ style.settingsBlock_title }>
						{ t("modals.settings.tableInfo") }
					</div>
					<div className={ style.settingsBlock_filter }>
						<InputCheckbox value={ t("modals.settings.links") }
									   inputName="table-info"
									   checked={ localFilters.links }
									   onChange={ () => handleLocalToggle("links") }/>
						<InputCheckbox value={ t("modals.settings.pm") }
									   inputName="table-info"
									   checked={ localFilters.pm }
									   onChange={ () => handleLocalToggle("pm") }/>
						<InputCheckbox value={ t("modals.settings.hours") }
									   inputName="table-info"
									   checked={ localFilters.hours }
									   onChange={ () => handleLocalToggle("hours") }/>
						<InputCheckbox value={ t("modals.settings.toDo") }
									   inputName="table-info"
									   checked={ localFilters.todo }
									   onChange={ () => handleLocalToggle("todo") }/>
					</div>
					
					{ hasAnyFalse && (
						<Button variant="secondary" onClick={ handleRestoreFilter }>
							<span>{ t("uiText.reset") }</span>
						</Button>
					) }
				
				</div>
			</div>
			<div className={ style.modalActions }>
				<Button variant="primary" onClick={ handleSaveFilters } className={ style.submit }>
					<span>{ t("uiText.save") }</span>
				</Button>
			</div>
		</>
	);
}

export default ModalSettings;