"use client";

import { Button } from "@/components/UI";
import { Modal, ModalProject } from '@/components/Modals';
import { useUserStore } from '@/store';
import { PlusCircleIcon } from "@/components/Icons";
import style from './header.module.scss';
import { useTranslations } from "next-intl";

const HeaderAddProject = () => {
	const { setModalID } = useUserStore();
	const t = useTranslations();
	
	return (<>
		<Button variant="secondary" type="button"
				className={ style.addProject }
				data-modal-id={ 'modal-add-project' }
				onClick={ e => setModalID(e.currentTarget.dataset.modalId) }
		>
			<PlusCircleIcon size={ 14 } className={ style.icon }/>
			{ t("header.buttonAddProject") }
		</Button>
		<Modal animation={ 'center' }
			   id="modal-add-project"
			   title={ t("modals.newProject.title") }>
			<ModalProject mode="create"/>
		</Modal>
	</>);
}

export default HeaderAddProject;