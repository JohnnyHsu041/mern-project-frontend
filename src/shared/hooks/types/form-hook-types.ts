export type InputsObj = {
    [props: string]: { value: string; isValid: boolean } | undefined;
};

export type FormState = {
    inputs: InputsObj;
    isValid: boolean;
};

interface InputChangeAction {
    type: "INPUT_CHANGE";
    inputId: string;
    isValid: boolean;
    value: string;
}

interface SetDataAction {
    type: "SET_DATA";
    isValid: boolean;
    inputs: InputsObj;
}

export type Action = InputChangeAction | SetDataAction;

export type InputHandler = (
    id: string,
    value: string,
    isValid: boolean
) => void;

export type SetDataHandler = (
    inputData: InputsObj,
    formValidity: boolean
) => void;
