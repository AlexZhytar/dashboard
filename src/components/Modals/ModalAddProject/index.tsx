import style from "./style.module.scss";
import modals from "../modal.module.scss";
import { modalText } from "@/constants";
import { useUserStore } from "@/store";
import { Button, InputAssignee, InputRadioColor, InputText, Preloader } from "@/components/UI";
import React, { useCallback, useState } from "react";
import { useManagers } from "@/features/employees";

interface Manager {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string | null;
	role: string;
}

interface ProjectAssignee {
	user: string;
	id: string;
}

interface FormState {
	projectLabel: string;
	projectColor: string;
	projectEverhour: string;
	projectApproved: string;
	projectMonthly: string;
	projectClickup: string;
	projectAssignee: ProjectAssignee[];
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

const ModalAddProject = () => {
	const { setModalID } = useUserStore();
	const { managers, loadManagers } = useManagers();
	
	const [ formData, setFormData ] = useState<FormState>({
		projectLabel: "",
		projectColor: "",
		projectEverhour: "",
		projectApproved: "",
		projectMonthly: "",
		projectClickup: "",
		projectAssignee: []
	});
	
	const handleChange = useCallback(
		( e: React.ChangeEvent<HTMLInputElement> ) => {
			const { name, value, type, checked, dataset } = e.target;
			
			// Чекбокси для виконавців
			if ( type === "checkbox" && dataset.userId ) {
				const userId = dataset.userId;
				
				setFormData(prev => {
					const exists = prev.projectAssignee.some(a => a.id === userId);
					
					let projectAssignee: ProjectAssignee[];
					
					if ( checked ) {
						if ( exists ) return prev;
						
						projectAssignee = [
							...prev.projectAssignee,
							{ user: value, id: userId }
						];
					} else {
						projectAssignee = prev.projectAssignee.filter(a => a.id !== userId);
					}
					
					return {
						...prev,
						projectAssignee
					};
				});
				
				return;
			}
			
			setFormData(prev => ({
				...prev,
				[name]: value
			}));
		},
		[]
	);
	
	// (опційно) onSubmit тут, якщо потрібно обробляти форму
	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	...
	// };
	
	const assignedManagers: Manager[] = Array.isArray(managers) ? managers : [];
	
	return (
		<form noValidate className={ style.formAddProject }>
			<div className={ style.formAddProject_inner }>
				<div className={ `${ modals.field } ${ modals.field_50 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.name }
					</div>
					<div className={ modals.field_input }>
						<InputText
							name="projectLabel"
							placeholder={ modalText.addProject.placeholders.name }
							value={ formData.projectLabel }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_50 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.color }
					</div>
					<div className={ modals.field_color }>
						{ PROJECT_COLORS.map(color => (
							<InputRadioColor
								key={ color }
								name="projectColor"
								color={ color }
								onChange={ handleChange }
							/>
						)) }
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_100 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.assignee }
					</div>
					<div className={ modals.field_assignee }>
						{ loadManagers && <Preloader size="sm"/> }
						
						{ assignedManagers.map(manager => (
							<InputAssignee
								key={ manager.id }
								inputName={ `projectAssignee-${ manager.id }` }
								userName={ `${ manager.first_name } ${ manager.last_name }` }
								onChange={ handleChange }
								idUser={ `${ manager.id }` }
							/>
						)) }
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.approved }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number
							name="projectApproved"
							placeholder={ modalText.addProject.placeholders.approved }
							value={ formData.projectApproved }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.monthly }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number
							name="projectMonthly"
							placeholder={ modalText.addProject.placeholders.monthly }
							value={ formData.projectMonthly }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_33 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.everhour }
					</div>
					<div className={ modals.field_input }>
						<InputText
							number
							name="projectEverhour"
							placeholder={ modalText.addProject.placeholders.everhour }
							value={ formData.projectEverhour }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_100 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.clickupLink }
					</div>
					<div className={ modals.field_input }>
						<InputText
							name="projectClickup"
							placeholder={ modalText.addProject.placeholders.clickup }
							value={ formData.projectClickup }
							onChange={ handleChange }
						/>
					</div>
				</div>
				
				<div className={ `${ modals.field } ${ modals.field_100 }` }>
					<div className={ modals.field_caption }>
						{ modalText.addProject.labels.links }
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
					{ modalText.addProject.buttons.cancel }
				</Button>
				<Button type="submit" variant="primary">
					{ modalText.addProject.buttons.submit }
				</Button>
			</div>
		</form>
	);
};

export default ModalAddProject;
