import { useState } from "react";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UI/Card";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { AuthAction } from "../../store/auth-slice";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import classes from "./Auth.module.css";

const Auth: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

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

    const authSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsLoading(true);

        if (isLoginMode) {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: formState.inputs.email!.value,
                            password: formState.inputs.password!.value,
                        }),
                    }
                );
                const responseData = await response.json();

                if (!response.ok) {
                    // status code: 4xx/ 5xx
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                dispatch(AuthAction.login());
            } catch (err: any) {
                setIsLoading(false);
                setError(
                    err.message || "Something went wrong, please try again"
                );
            }
        } else {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/users/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: formState.inputs.name!.value,
                            email: formState.inputs.email!.value,
                            password: formState.inputs.password!.value,
                        }),
                    }
                );
                const responseData = await response.json();

                if (!response.ok) {
                    // status code: 4xx/ 5xx
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                dispatch(AuthAction.login());
            } catch (err: any) {
                setIsLoading(false);
                setError(
                    err.message || "Something went wrong, please try again"
                );
            }
        }
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            <Card className={classes.authentication}>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
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
                        {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
                </Button>
            </Card>
        </>
    );
};

export default Auth;
