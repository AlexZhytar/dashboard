import { ReactNode } from "react";

export type ModalAnimation = 'top' | 'right' | 'bottom' | 'left' | 'center';

export type ModalProps = {
    animation?: ModalAnimation;
    title?: string;
    id: string; 
    children: ReactNode;
};
