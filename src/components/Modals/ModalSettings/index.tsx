import style from "./modal-settings.module.scss";
import { useTranslations } from "next-intl";
import { Button, InputAssignee } from "@/components/UI";
import React, { useState } from "react";
import InputCheckbox from "@/components/UI/InputCheckbox";

const ModalSettings = () => {
	const t = useTranslations();
	const [ formData, setFormData ] = useState<{
		projectAssignee: { user: string; id: string | null }[];
	}>({
		projectAssignee: []
	});
	
	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
		const { name, value, type } = e.target;
		
		if ( type === "checkbox" ) {
			const isChecked = e.target.checked;
			const userId = e.target.getAttribute('data-user-id');
			setFormData(prev => {
				const prevAssignees = Array.isArray(prev.projectAssignee) ? prev.projectAssignee : [];
				if ( isChecked ) {
					if ( !prevAssignees.some(a => a.id === userId) ) {
						return {
							...prev,
							projectAssignee: [
								...prevAssignees,
								{ user: value, id: userId }
							]
						};
					}
					return prev;
				} else {
					return {
						...prev,
						projectAssignee: prevAssignees.filter(a => a.id !== userId)
					};
				}
			});
		} else if ( type === "radio" ) {
			setFormData(prev => ({ ...prev, [name]: value }));
		} else {
			setFormData(prev => ({ ...prev, [name]: value }));
		}
	};
	
	return (<>
			<div className={ style.modalSettings }>
				<div className={ style.settingsBlock }>
					<div className={ style.settingsBlock_title }>
						{ t("modals.settings.filters") }
					</div>
					<div className={ style.settingsBlock_filter }>
						<div className={ style.filterCaption }>{ t("modals.settings.projectManager") }</div>
						<div className={ style.filterList }>
							<InputAssignee inputName={ "filter-manager" }
										   userName={ "All" }
										   onChange={ handleChange }
										   idUser={ 'user-1' }/>
							<InputAssignee inputName={ "filter-manager" }
										   userName={ "Dmytro Koval" }
										   onChange={ handleChange }
										   idUser={ 'user-2' }/>
							<InputAssignee inputName={ "filter-manager" }
										   userName={ "Anna Mantrova" }
										   onChange={ handleChange }
										   idUser={ 'user-3' }/>
							<InputAssignee inputName={ "filter-manager" }
										   userName={ "Heorhii Popov" }
										   onChange={ handleChange }
										   idUser={ 'user-4' }/>
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
									   onChange={ handleChange }/>
						<InputCheckbox value={ t("modals.settings.pm") }
									   inputName="table-info"
									   onChange={ handleChange }/>
						<InputCheckbox value={ t("modals.settings.hours") }
									   inputName="table-info"
									   onChange={ handleChange }/>
						<InputCheckbox value={ t("modals.settings.toDo") }
									   inputName="table-info"
									   onChange={ handleChange }/>
					</div>
				
				</div>
			</div>
			<div className={ style.modalActions }>
				<Button variant="primary" className={ style.submit }>
					<span>{ t("uiText.save") }</span>
				</Button>
			</div>
		</>
	);
}

export default ModalSettings;