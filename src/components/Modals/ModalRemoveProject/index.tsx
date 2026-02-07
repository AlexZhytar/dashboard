"use client";

import React, { useCallback, useState } from "react";
import style from "./style.module.scss";
import { Button, InputText, Preloader, Toast } from "@/components/UI";
import { useTranslations } from "next-intl";
import { useProjectsStore, useUserStore } from "@/store";

interface ModalRemoveProjectProps {
	projectID: number;
	project_name: string;
}

const ModalRemoveProject = ( {
	projectID,
	project_name,
}: ModalRemoveProjectProps ) => {
	const [ input, setInput ] = useState("");
	const t = useTranslations();
	const { setModalID } = useUserStore();
	const { fetchProjects } = useProjectsStore();
	const [ loading, setLoading ] = useState(false);
	
	const handleRemove = useCallback(async () => {
		setLoading(true);
		
		try {
			const response = await fetch(
				`/api/projects/delete-project?project_id=${ projectID }`,
				{ method: "POST" }
			);
			
			const res = await response.json();
			
			if ( !res.status ) {
				console.error("Error deleting project:", res.error);
				return;
			}
			
			await fetchProjects();
			setModalID(null);
		} catch ( error ) {
			console.error("Ошибка запроса:", error);
		} finally {
			setLoading(false);
		}
	}, [ projectID, fetchProjects, setModalID ]);
	
	return (
		<div className={ style.removeProject }>
			{ loading && <Preloader size="sm" overflow={ false } text="Remove project…"/> }
			<div className={ style.wrapper }>
				<div className={ style.text }>
					<p
						dangerouslySetInnerHTML={ {
							__html: t("modals.deleteProject.message"),
						} }
					/>
					<Toast
						variant={ "error" }
						message={ `${ t("modals.deleteProject.confirmText") } ${ project_name }` }
					/>
				</div>
				<InputText
					value={ input }
					placeholder={ t("modals.deleteProject.inputPlaceholder") }
					onChange={ ( e ) => setInput(e.target.value) }
				/>
			</div>
			
			<div className={ style.actions }>
				<Button
					className={ style.button }
					onClick={ () => setModalID(null) }
					variant={ "secondary" }
				>
					{ t("modals.deleteProject.cancelButton") }
				</Button>
				<Button
					className={ style.button }
					onClick={ handleRemove }
					disabled={
						input !== `${ t("modals.deleteProject.confirmText") } ${ project_name }`
					}
				>
					{ t("modals.deleteProject.confirmButton") }
				</Button>
			</div>
		</div>
	);
};

export default ModalRemoveProject;
