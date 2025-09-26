'use client';

import { Modal, ModalSettings } from '@/components/Modals';
import Button from '@/components/UI/Button';
import { useUserStore } from '@/store';
import { projectsDefault } from "@/constants"

const ProjectsSettings = () => {
    const { setModalID } = useUserStore();

    return (
        <>
            <Button
                data-modal-id={'modalSettings'}
                onClick={e => setModalID(e.currentTarget.dataset.modalId)} >
                {projectsDefault.button_settings}
            </Button>
            <Modal animation={'right'}
                id="modalSettings"
                title='Settings' >
                <ModalSettings />
            </Modal>
        </>
    );
}

export default ProjectsSettings;