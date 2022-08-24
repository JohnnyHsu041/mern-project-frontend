import React, { useReducer } from "react";

import { validate } from "../../utils/validators";
import classes from "./Input.module.css";

interface InputProps {
    element?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
    errorText?: string;
    validators: { type: string; val?: number }[];
}

type inputState = {
    value: string;
    isValid: boolean;
    isTouched: boolean;
};

const inputReducer = (
    state: inputState,
    action: {
        type: string;
        val: string;
        validators: { type: string; val?: number }[];
    }
) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val!, action.validators!),
            };

        case "TOUCHED":
            return {
                ...state,
                isTouched: true,
            };

        default:
            return state;
    }
};

const Input: React.FC<InputProps> = ({
    element,
    id,
    type,
    placeholder,
    rows,
    label,
    errorText,
    validators,
}) => {
    const [enteredInput, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        isTouched: false,
    });

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: validators,
        });
    };

    const touchHandler = () => {
        dispatch({ type: "TOUCHED", val: "", validators: [{ type: "" }] });
    };

    const renderElement =
        element === "input" ? (
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={enteredInput.value}
            />
        ) : (
            <textarea
                id={id}
                rows={rows || 3}
                value={enteredInput.value}
                onBlur={touchHandler}
            />
        );

    return (
        <div
            className={`
                ${classes["form-control"]} 
                ${
                    !enteredInput.isValid &&
                    enteredInput.isTouched &&
                    classes["form-control--invalid"]
                }
            `}
        >
            <label htmlFor={id}>{label}</label>
            {renderElement}
            {!enteredInput.isValid && enteredInput.isTouched && (
                <p>{errorText}</p>
            )}
        </div>
    );
};

export default Input;
