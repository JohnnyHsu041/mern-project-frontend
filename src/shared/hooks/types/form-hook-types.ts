export type InputsObj = {
    [props: string]: { value: string; isValid: boolean };
};

export type FormState = {
    inputs: InputsObj;
    isValid: boolean;
};

export interface InputChangeAction {
    type: string;
    inputId: string;
    isValid: boolean;
    value: string;
    inputs?: any;
}

export interface SetDataAction {
    type: string;
    isValid: boolean;
    inputs: InputsObj;
    inputId?: any;
    value?: any;
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
