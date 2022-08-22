import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

const SideDrawer: React.FC<{
    children: React.ReactNode;
    show: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}> = ({ children, show, onClick }) => {
    const content = (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className={classes["side-drawer"]} onClick={onClick}>
                {children}
            </aside>
        </CSSTransition>
    );
    const hookTag = document.getElementById("drawer-hook")! as HTMLDivElement;

    return ReactDOM.createPortal(content, hookTag);
};

export default SideDrawer;
