import Button from "@/components/UI/Button";
import style from "./modal-add-project.module.scss";
import { modalText } from "@/constants"
import { useUserStore } from "@/store";
import InputRadioColor from "@/components/UI/InputRadioColor";
import InputText from "@/components/UI/InputText";
import { useState } from "react";
import InputAssignee from "@/components/UI/InputAssignee";

const ModalAddProject = () => {
    const { setModalID } = useUserStore();
    const [formData, setFormData] = useState<{
        projectLabel: string;
        projectEverhour: string;
        projectApproved: string;
        projectMonthly: string;
        projectClickup: string;
        projectAssignee: { user: string; id: string | null }[];
    }>({
        projectLabel: "",
        projectEverhour: "",
        projectApproved: "",
        projectMonthly: "",
        projectClickup: "",
        projectAssignee: []
    });

    console.log(formData);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const isChecked = e.target.checked;
            const userId = e.target.getAttribute('data-user-id');
            setFormData(prev => {
                const prevAssignees = Array.isArray(prev.projectAssignee) ? prev.projectAssignee : [];
                if (isChecked) {
                    if (!prevAssignees.some(a => a.id === userId)) {
                        return {
                            ...prev,
                            projectAssignee: [
                                ...prevAssignees,
                                { user: value, id: userId }
                            ]
                        };
                    }
                    return prev;
                } else {
                    return {
                        ...prev,
                        projectAssignee: prevAssignees.filter(a => a.id !== userId)
                    };
                }
            });
        } else if (type === "radio") {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <form noValidate className={style.formAddProject}>
            <div className={style.formAddProject_inner}>
                <div className={`${style.formAddProject_field} ${style.field_50}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.name}
                    </div>
                    <div className={style.formAddProject_field_input}>
                        <InputText
                            name="projectLabel"
                            placeholder={modalText.addProject.placeholders.name}
                            value={formData.projectLabel}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_50}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.color}
                    </div>
                    <div className={style.formAddProject_field_color}>
                        <InputRadioColor name="projectColor" color="red" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="orange" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="brown" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="yellow" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="green" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="mint" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="cyan" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="blue" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="indigo" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="purple" onChange={handleChange} />
                        <InputRadioColor name="projectColor" color="pink" onChange={handleChange} />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.assignee}
                    </div>
                    <div className={style.formAddProject_field_assignee}>
                        <InputAssignee inputName="projectAssignee-1" userName={"Dmytro Koval"} onChange={handleChange} idUser={"1"} />
                        <InputAssignee inputName="projectAssignee-2" userName={"Dmytro Koval"} onChange={handleChange} idUser={"2"} />
                        <InputAssignee inputName="projectAssignee-3" userName={"Dmytro Koval"} onChange={handleChange} idUser={"3"} />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_33}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.approved}
                    </div>
                    <div className={style.formAddProject_field_input}>
                        <InputText
                            number={true}
                            name="projectApproved"
                            placeholder={modalText.addProject.placeholders.approved}
                            value={formData.projectApproved}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_33}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.monthly}
                    </div>
                    <div className={style.formAddProject_field_input}>
                        <InputText
                            number={true}
                            name="projectMonthly"
                            placeholder={modalText.addProject.placeholders.monthly}
                            value={formData.projectMonthly}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_33}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.everhour}
                    </div>
                    <div className={style.formAddProject_field_input}>
                        <InputText
                            number={true}
                            name="projectEverhour"
                            placeholder={modalText.addProject.placeholders.everhour}
                            value={formData.projectEverhour}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.clickupLink}
                    </div>
                    <div className={style.formAddProject_field_input}>
                        <InputText
                            name="projectClickup"
                            placeholder={modalText.addProject.placeholders.clickup}
                            value={formData.projectClickup}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`${style.formAddProject_field} ${style.field_100}`}>
                    <div className={style.formAddProject_field_caption}>
                        {modalText.addProject.labels.links}
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