"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { modalAnimations } from "../modal-animations";
import { useUserStore } from "@/store/useUserStore";
import style from "../modal.module.scss";
import { ReactNode } from "react";

type ModalAnimation = 'top' | 'right' | 'bottom' | 'left' | 'center';

type ModalProps = {
	animation?: ModalAnimation;
	title?: string;
	id: string;
	children: ReactNode;
	className?: string;
};

const Modal = ( { animation, id, children, title, className = '' }: ModalProps ) => {
	const { modalID, setModalID } = useUserStore();
	
	const positions = {
		top: modalAnimations.slideModalTop(),
		right: modalAnimations.slideModalRight(),
		bottom: modalAnimations.slideModalBot(),
		left: modalAnimations.slideModalLeft(),
		center: modalAnimations.slideModalCenter()
	}
	const position = animation ? positions[animation] : positions.center;
	const styleShow = Object.keys(positions).find(key => key === animation);
	const toggleModal = () => setModalID(null);
	
	return (
		<AnimatePresence>
			{ id === modalID && (
				<m.div
					transition={ { duration: .3 } }
					{ ...modalAnimations.init(modalAnimations.fadeModal()) }
					onClick={ toggleModal }
					id={ id }
					className={ `${ style.modal } ${ style.is_open } ${ style[`is_${ styleShow }`] } ${ className }` }>
					<m.div className={ style.modal_wrapper }
						   transition={ { duration: .4, ease: "easeInOut" } }
						   { ...modalAnimations.init(position) } >
						<div className={ style.modal_close } onClick={ toggleModal }></div>
						<div className={ style.modal_inner } onClick={ ( e ) => e.stopPropagation() }>
							{
								title &&
                              <div className={ style.modal_head } dangerouslySetInnerHTML={ { __html: title } }/>
							}
							{ children }
						</div>
					</m.div>
				</m.div>
			) }
		</AnimatePresence>
	)
};

export default Modal;