import { getInitials } from "@/utils";
import style from "./input-assignee.module.scss";

const InputAssignee = (
    { inputName, userName, onChange, value, idUser }:
        {
            inputName: string,
            userName: string,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
            idUser: string
        }) => {

    const initials = getInitials(userName);

    return (
        <label className={style.inputAssignee}>
            <input type="checkbox" className={style.inputAssignee_input} data-user-id={idUser} name={`${inputName}`}
                value={userName}
                onChange={onChange} />
            <span className={style.inputAssignee_initials}>{initials}</span>
            <span className={style.inputAssignee_fullname}>{userName}</span>
            <span className={style.inputAssignee_checkmark}></span>
        </label>
    );
}

export default InputAssignee;