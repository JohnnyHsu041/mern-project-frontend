import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UI/Card";
import classes from "./Auth.module.css";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { useState } from "react";

const Auth: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setForm] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            // means it is turning to login mode, so only need to check email & password validity
            setForm(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email!.isValid &&
                    formState.inputs.password!.isValid
            );
        } else {
            setForm(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }

        setIsLoginMode((prevMode: boolean) => !prevMode);
    };

    const authSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <Card className={classes.authentication}>
            <h2>{isLoginMode ? "Login Required" : "Sign up"}</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        type="text"
                        id="name"
                        label="Your Name"
                        onInput={inputHandler}
                        errorText="Please enter a valid name"
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                )}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-mail"
                    errorText="Please enter a valid email address"
                    validators={[VALIDATOR_EMAIL()]}
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    errorText="Please enter a valid password (At least 5 characters)"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    LOGIN
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    );
};

export default Auth;
