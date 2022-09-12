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
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const dispatch = useDispatch();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

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

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "http://localhost:8080/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email!.value,
                        password: formState.inputs.password!.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );

                dispatch(AuthAction.login(responseData.user.id));
            } catch (err: any) {
                console.log(err.message);
            }
        } else {
            try {
                const responseData = await sendRequest(
                    "http://localhost:8080/api/users/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name!.value,
                        email: formState.inputs.email!.value,
                        password: formState.inputs.password!.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );

                dispatch(AuthAction.login(responseData.user.id));
            } catch (err: any) {
                console.log(err.message);
            }
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                        errorText="Please enter a valid password (At least 6 characters)"
                        validators={[VALIDATOR_MINLENGTH(6)]}
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
