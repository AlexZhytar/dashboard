"use client";

import Button from "@/components/UI/Button";
import { headerDefault } from "@/constants";
import { Modal, ModalAddProject } from '@/components/Modals';
import { useUserStore } from '@/store';
import { PlusCircleIcon } from "@/components/UI/Icons/PlusCircleIcon";

const HeaderAddProject = () => {
    const { setModalID } = useUserStore();
 
    return (<>
        <Button variant="secondary" type="button"
            className={"addProject"} 
            data-modal-id={'modal-add-project'}
            onClick={e => setModalID(e.currentTarget.dataset.modalId)}
        >
            <PlusCircleIcon size={14} />
            {headerDefault.buttonAddProject}
        </Button>
        <Modal animation={'center'}
            id="modal-add-project"
            title='New Project' >
            <ModalAddProject />
        </Modal>
    </>);
}

export default HeaderAddProject;