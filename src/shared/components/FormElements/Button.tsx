import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    size?: string;
    inverse?: any;
    danger?: any;
    to?: string;
    exact?: any;
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: any;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (props.href) {
        return (
            <a
                className={`${classes["button"]} ${
                    classes[`button--${props.size || "default"}`]
                } ${classes[`${props.inverse && "button--inverse"}`]} ${
                    classes[`${props.danger && "button--danger"}`]
                }`}
                href={props.href}
            >
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                // exact={props.exact}
                className={`${classes["button"]} ${
                    classes[`button--${props.size || "default"}`]
                } ${classes[`${props.inverse && "button--inverse"}`]} ${
                    classes[`${props.danger && "button--danger"}`]
                }`}
            >
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`${classes["button"]} ${
                classes[`button--${props.size || "default"}`]
            } ${classes[`${props.inverse && "button--inverse"}`]} ${
                classes[`${props.danger && "button--danger"}`]
            }`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
