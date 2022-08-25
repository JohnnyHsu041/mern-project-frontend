import { useCallback, useReducer } from "react";
import {
    InputsObj,
    FormState,
    Action,
    InputHandler,
    SetDataHandler,
} from "./types/form-hook-types";

const formReducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (!state.inputs[inputId]) continue;

                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId]!.isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };

        case "SET_DATA":
            return {
                inputs: action.inputs,
                isValid: action.isValid,
            };

        default:
            return state;
    }
};

export const useForm = (
    initialInputs: InputsObj,
    initialFormValidity: boolean
): [FormState, InputHandler, SetDataHandler] => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({
                type: "INPUT_CHANGE",
                inputId: id,
                value,
                isValid,
            });
        },
        []
    );

    const setForm = useCallback(
        (inputData: InputsObj, formValidity: boolean) => {
            dispatch({
                type: "SET_DATA",
                inputs: inputData,
                isValid: formValidity,
            });
        },
        []
    );

    return [formState, inputHandler, setForm];
};
