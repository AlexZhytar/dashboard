import Button from "@/components/UI/Button";
import style from "./modal-add-project.module.scss";
import { modalText } from "@/constants"
import { useUserStore } from "@/store";

const ModalAddProject = () => {
    const { setModalID } = useUserStore();

    return (
        <form noValidate className={style.formAddProject}>
            <div className={style.formAddProject_inner}>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.name}
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.color}
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.assignee}
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.approved}
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.monthly}
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.links }
                    </div>
                </div>

            </div>
            <div className={style.formAddProject_bottom}>
                <Button type="button" variant="secondary"
                    data-modal-id={'modal-add-project'}
                    onClick={e => setModalID(null)} >
                    {modalText.addProject.buttons.cancel}
                </Button>
                <Button type="submit" variant="primary">
                    {modalText.addProject.buttons.submit}
                </Button>
            </div>
        </form>
    );
}

export default ModalAddProject;