'use client';

import { Modal, ModalSettings } from '@/components/Modals';
import { Button } from '@/components/UI';
import { useUserStore } from '@/store';
import { useTranslations } from "next-intl";

const ProjectsSettings = () => {
	const { setModalID } = useUserStore();
	const t = useTranslations();
	
	return (
		<>
			<Button
				data-modal-id={ 'modalSettings' }
				onClick={ e => setModalID(e.currentTarget.dataset.modalId) }>
				{ t("projects.buttons.settings") }
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