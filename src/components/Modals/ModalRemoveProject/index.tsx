import React from 'react';
import style from './style.module.scss';
import { Button, InputText, Toast } from "@/components/UI";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/store";

interface ModalRemoveProject {
	project_name: string;
}

const ModalRemoveProject = ( { project_name }: ModalRemoveProject ) => {
	const [ input, setInput ] = React.useState('');
	const t = useTranslations();
	const { setModalID } = useUserStore();
	
	return (
		<div className={ style.removeProject }>
			<div className={ style.wrapper }>
				<div className={ style.text }>
					<p dangerouslySetInnerHTML={ { __html: t("modals.deleteProject.message") } }/>
					<Toast variant={ 'error' }
						   message={ `${ t("modals.deleteProject.confirmText") } ${ project_name }` }/>
				</div>
				<InputText value={ input }
						   placeholder={ t("modals.deleteProject.inputPlaceholder") }
						   onChange={ ( e ) => setInput(e.target.value) }
				/>
			</div>
			
			<div className={ style.actions }>
				<Button className={ style.button }
						onClick={ () => setModalID(null) }
						variant={ 'secondary' }>
					{ t("modals.deleteProject.cancelButton") }
				</Button>
				<Button className={ style.button }
						onClick={ () => setModalID(null) }
						disabled={ input !== `${ t("modals.deleteProject.confirmText") } ${ project_name }` }>
					{ t("modals.deleteProject.confirmButton") }
				</Button>
			</div>
		</div>
	);
};

export default ModalRemoveProject;