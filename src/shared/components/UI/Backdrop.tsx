import React from "react";
import ReactDOM from "react-dom";

import classes from "./Backdrop.module.css";

interface BackdropProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
    return ReactDOM.createPortal(
        <div className={classes.backdrop} onClick={onClick}></div>,
        document.getElementById("backdrop-hook")! as HTMLDivElement
    );
};

export default Backdrop;
