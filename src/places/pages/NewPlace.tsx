import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import classes from "./PlaceForm.module.css";
import { useCallback, useReducer } from "react";

type FormState = {
    inputs: {
        [props: string]: { value: string; isValid: boolean };
    };
    isValid: boolean;
};

type Action = {
    type: string;
    inputId: string;
    isValid: boolean;
    value: string;
};

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

const NewPlace: React.FC = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: { value: "", isValid: false },
            description: { value: "", isValid: false },
            address: { value: "", isValid: false },
        },
        isValid: false,
    });

    const inputHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({ type: "INPUT_CHANGE", inputId: id, value, isValid });
        },
        []
    );

    const placeSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)"
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
