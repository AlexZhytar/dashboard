'use client';

import { Modal, ModalSettings } from '@/components/Modals';
import { Button } from '@/components/UI';
import { useUserStore } from '@/store';
import { useTranslations } from "next-intl";
import { TableCogIcon } from "@/components/Icons";
import style from '../projects.module.scss';

const ProjectsSettings = () => {
	const { setModalID } = useUserStore();
	const t = useTranslations();
	
	return (
		<>
			<Button className={ style.projects_settings }
					onClick={ e => setModalID("modalSettings") }>
				<TableCogIcon size={ 20 }/>
				<span>{ t("uiText.settings") }</span>
			</Button>
			<Modal animation={ 'right' }
				   id="modalSettings"
				   title={ `${ t("uiText.settings") }` }>
				<ModalSettings/>
			</Modal>
		</>
	);
}

export default ProjectsSettings;