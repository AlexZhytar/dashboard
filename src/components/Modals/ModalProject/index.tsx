import React, { useCallback, useState } from "react";
import style from "./style.module.scss";
import modals from "../modal.module.scss";
import { useUserStore } from "@/store";
import { Button, InputAssignee, InputRadioColor, InputText, Preloader } from "@/components/UI";
import { useManagers } from "@/features/employees";
import { useTranslations } from "next-intl";

interface ProjectManager {
	first_name: string;
	last_name: string;
	id: string;
}

type managersType = ProjectManager | ProjectManager[];

interface FormState {
	projectID: string,
	projectName: string;
	projectColor: string;
	projectEverhour: string;
	projectApproved: number;
	projectMonths: number;
	projectTracked: number;
	projectManagers: ProjectManager[];
}

const PROJECT_COLORS = [
	"red",
	"orange",
	"brown",
	"yellow",
	"green",
	"mint",
	"cyan",
	"blue",
	"indigo",
	"purple",
	"pink"
] as const;

interface ModalProjectProps {
	project?: {
		id: string;
		label: string;
		color: string;
		confirmed_hours: number;
		months_hours: number;
		tracked_hours: number;
		everhour_id: string;
		managers: {
			id: string;
			first_name: string;
			last_name: string;
		}[];
	};
	mode: "create" | "edit" | string;
}

const ModalProject = ( { project, mode }: ModalProjectProps ) => {
	const { setModalID } = useUserStore();
	const { managers, loadManagers } = useManagers();
	const t = useTranslations();
	
	console.log(managers)
	
	const rawManagers = managers;
	const assignedManagers: managersType = Array.isArray(rawManagers)
		? rawManagers
		: rawManagers
			? [ rawManagers ]
			: [];
	
	const [ formData, setFormData ] = useState<FormState>(() => {
		if ( !project || mode === "create" ) {
			return {
				projectID: "",
				projectName: "",
				projectColor: "",
				projectEverhour: "",
				projectApproved: 0,
				projectMonths: 0,
				projectTracked: 0,
				projectManagers: []
			};
		}
		
		return {
			projectID: project.id,
			projectName: project.label,
			projectColor: project.color,
			projectApproved: project.confirmed_hours,
			projectMonths: project.months_hours,
			projectTracked: project.tracked_hours,
			projectEverhour: project.everhour_id,
			projectManagers: project.managers.map(a => ({
				id: a.id,
				first_name: a.first_name,
				last_name: a.last_name,
			}))
		};
	});
	
	const handleChange = useCallback(( e: React.ChangeEvent<HTMLInputElement> ) => {
		const { name, value, type, checked, dataset } = e.target;
		
		if ( type === "checkbox" && dataset.userId ) {
			const userId = dataset.userId;
			const firstName = dataset.firstName || "";
			const lastName = dataset.lastName || "";
			
			setFormData(prev => {
				const exists = prev.projectManagers.some(a => a.id === userId);
				let projectManagers: ProjectManager[];
				
				if ( checked ) {
					if ( exists ) return prev;
					projectManagers = [
						...prev.projectManagers,
						{
							id: userId,
							first_name: firstName,
							last_name: lastName
						}
					];
				} else {
					projectManagers = prev.projectManagers.filter(a => a.id !== userId);
				}
				
				return {
					...prev,
					projectManagers
				};
			});
			
			return;
		}
		
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	}, []);
	
	const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
		e.preventDefault();
		
		
	};
	
	return (
		<form noValidate className={ style.formAddProject }>
			<div className={ style.formAddProject_inner }>
				<div className={ `${ modals.field } ${ modals.field_50 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.projectName") }
					</div>
					<div className={ modals.field_input }>
						<InputText
							name="projectName"
							placeholder={ t("modals.newProject.placeholders.projectName") }
							value={ formData.projectName }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_50 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.accentColor") }
					</div>
					<div className={ modals.field_color }>
						{ PROJECT_COLORS.map(color => (
							<InputRadioColor
								key={ color }
								checked={ formData.projectColor === color }
								name="projectColor"
								color={ color }
								onChange={ handleChange }
							/>
						)) }
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_100 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.assignee") }
					</div>
					<div className={ modals.field_assignee }>
						{ loadManagers && <Preloader size="sm"/> }
						
						{ assignedManagers.map(manager => {
							const isChecked = formData.projectManagers.some(
								m => m.id === manager.id.toString()
							);
							
							return (
								<InputAssignee
									key={ manager.id }
									inputName={ `projectAssignee-${ manager.id }` }
									first_name={ manager.first_name }
									last_name={ manager.last_name }
									onChange={ handleChange }
									idUser={ `${ manager.id }` }
									checked={ isChecked }
								/>
							);
						}) }
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.approved") }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number
							name="projectApproved"
							placeholder={ t("modals.newProject.placeholders.approved") }
							value={ formData.projectApproved }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.monthly") }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number={ true }
							name="projectMonths"
							placeholder={ t("modals.newProject.placeholders.monthly") }
							value={ formData.projectMonths }
							onChange={ handleChange }
						/>
					</div>
				</div>
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.tracked") }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number={ true }
							name="projectTracked"
							value={ formData.projectTracked }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_66 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.everhour") }
					</div>
					<div className={ modals.field_input }>
						<InputText
							name="projectEverhour"
							placeholder={ t("modals.newProject.placeholders.everhour") }
							value={ formData.projectEverhour }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_100 }` }>
					<div className={ modals.field_caption }>
						{ t("modals.newProject.labels.links") }
					</div>
					<div className={ modals.field_input }>
						{/*<InputText*/ }
						{/*	name="projectClickup"*/ }
						{/*	placeholder={ t("modals.newProject.placeholders.clickUpLink") }*/ }
						{/*	value={ formData.projectClickup }*/ }
						{/*	onChange={ handleChange }*/ }
						{/*/>*/ }
					</div>
				</div>
			</div>
			
			<div className={ style.formAddProject_bottom }>
				<Button
					type="button"
					variant="secondary"
					data-modal-id="modal-add-project"
					onClick={ () => setModalID(null) }
				>
					{ t("uiText.cancel") }
				</Button>
				<Button type="submit" onClick={ () => handleSubmit } variant="primary">
					{ mode === "create" ? t("uiText.createProject") : t("uiText.save") }
				</Button>
			</div>
		</form>
	);
};

export default ModalProject;
