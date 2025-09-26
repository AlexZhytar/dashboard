"use client";

import { AnimatePresence, motion as m } from "motion/react";
import { modalAnimations } from "@/constants";
import { useUserStore } from "@/store/useUserStore";
import { ModalProps } from '../types';
import style from "../modal.module.scss";


const Modal = ({ animation, id, children, title }: ModalProps) => {
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
      {id === modalID && (
        <m.div
          transition={{ duration: .5 }}
          {...modalAnimations.init(modalAnimations.fadeModal())}
          onClick={toggleModal}
          id={id}
          className={`${style.modal} ${style.is_open} ${style[`is_${styleShow}`]}`}>
          <m.div className={style.modal_wrapper}
            transition={{ duration: .4, ease: "easeInOut" }}
            {...modalAnimations.init(position)} >
            <div className={style.modal_close} onClick={toggleModal}></div>
            <div className={style.modal_inner} onClick={(e) => e.stopPropagation()}>
              {
                title && <div className={style.modal_head} dangerouslySetInnerHTML={{ __html: title }} />
              }
              {children}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
};

export default Modal;