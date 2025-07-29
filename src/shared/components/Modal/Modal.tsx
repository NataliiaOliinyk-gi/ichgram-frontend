import type { FC } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import RemoveIconLarge from "../Icons/RemoveIconLarge/RemoveIconLarge";

import styles from './Modal.module.css';

const modalRoot = document.querySelector("#modal-root");

interface IModalProps {
  close: ()  => void;
  titleModal: string;
  textModal: string | null;
}

const Modal: FC<IModalProps> = ({ close, titleModal, textModal }) => {

    const overlayRef = useRef();

    const closeModal = (event) => {
        const { target } = event;
        if (target === overlayRef.current) {
            close();
        }
    };

    useEffect(() => {
        const handleEscape = function ({ code }) {
            if (code === "Escape") {
                console.log("Escape");
                close();
            }
        };
        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [close]);

    // const elements = text.map(item => <p className={styles.text} key={item}>{item}</p>)

    return createPortal(
        <div ref={overlayRef} onClick={closeModal} className={styles.overlay}>
            <div className={styles.modalContainer}>
                <div className={styles.descriptionsContainer}>
                    <h3 className={styles.title}>{titleModal}</h3>
                    <div className={styles.textBox}>
                        {/* {elements} */}
                        <p>{textModal}</p>
                    </div>
                </div>

                <div>
                    <RemoveIconLarge onClick={close} />
                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default Modal;