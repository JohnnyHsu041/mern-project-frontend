import React, { useEffect, useReducer } from "react";

import { validate } from "../../utils/validators";
import classes from "./Input.module.css";

interface InputProps {
    id: string;
    element: string;
    onInput: (id: string, val: string, isValid: boolean) => void;
    validators: { type: string; val?: number }[];
    label: string;
    errorText: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    inputValue?: string;
    valid?: boolean;
}

type inputState = {
    value: string;
    isValid: boolean;
    isTouched: boolean;
};

type Action = {
    type: string;
    val: string;
    validators: { type: string; val?: number }[];
};

const inputReducer = (state: inputState, action: Action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
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
    onInput,
    inputValue,
    valid,
}) => {
    const [enteredInput, dispatch] = useReducer(inputReducer, {
        value: inputValue || "",
        isValid: valid || false,
        isTouched: false,
    });

    const { value, isValid } = enteredInput;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, onInput, value, isValid]);

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
                onChange={changeHandler}
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
