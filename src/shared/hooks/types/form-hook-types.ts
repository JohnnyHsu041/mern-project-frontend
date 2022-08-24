export type InputsObj = {
    [props: string]: { value: string; isValid: boolean };
};

export type FormState = {
    inputs: InputsObj;
    isValid: boolean;
};

export type Action = {
    type: string;
    inputId: string;
    isValid: boolean;
    value: string;
};

export type InputHandler = (
    id: string,
    value: string,
    isValid: boolean
) => void;
