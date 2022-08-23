import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../UI/Backdrop";
import classes from "./Modal.module.css";
import "../../../index.css";

type StyleObj = {
    [props: string]: string;
};

interface ModalProps<T> {
    show: boolean;
    onCancel: (event: React.MouseEvent) => void;
    className?: string;
    headerClass?: string;
    style?: T;
    header?: string;
    onSubmit?: (event: React.FormEvent) => void;
    contentClass?: string;
    children: React.ReactNode;
    footerClass?: string;
    footer?: string | JSX.Element;
}

const ModalOverlay: React.FC<ModalProps<StyleObj>> = (props) => {
    const content = (
        <div
            className={`${classes.modal} ${props.className}`}
            style={props.style}
        >
            <header
                className={`${classes["modal__header"]} ${props.headerClass}`}
            >
                <h2>{props.header}</h2>
            </header>
            <form
                onSubmit={
                    props.onSubmit
                        ? props.onSubmit
                        : (event) => event.preventDefault()
                }
            >
                <div
                    className={`${classes["modal__content"]} ${props.contentClass}`}
                >
                    {props.children}
                </div>
                <footer
                    className={`${classes["modal__footer"]} ${props.footerClass}`}
                >
                    {props.footer}
                </footer>
            </form>
        </div>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById("modal-hook")!
    );
};

const Modal: React.FC<ModalProps<StyleObj>> = (props) => {
    return (
        <>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                timeout={200}
                mountOnEnter
                unmountOnExit
                classNames="modal"
            >
                <ModalOverlay {...props} />
            </CSSTransition>
        </>
    );
};

export default Modal;
