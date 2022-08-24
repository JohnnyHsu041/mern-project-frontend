import { useCallback, useReducer } from "react";
import {
    InputsObj,
    FormState,
    Action,
    InputHandler,
} from "./types/form-hook-types";

const formReducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
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

        default:
            return state;
    }
};

export const useForm = (
    initialInputs: InputsObj,
    initialFormValidity: boolean
): [FormState, InputHandler] => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: "INPUT_CHANGE", inputId: id, value, isValid });
        },
        []
    );

    return [formState, inputHandler];
};
