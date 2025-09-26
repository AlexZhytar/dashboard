import style from './container.module.scss';
import { ChildrenProps } from "@/types/common";

const Container = ({ children }: ChildrenProps) => {
    return <div className={style.container}>{children}</div>;
}

export default Container;