import { useEffect, useState } from "react";
import { useHistory as History, useParams } from "react-router-dom";

import Card from "../../shared/components/UI/Card";
import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import classes from "./PlaceForm.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const UpdatePlace: React.FC = () => {
    const placeId = useParams<{ placeId: string }>().placeId;
    const history = History();
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState<PlaceInfo>();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const token = useSelector((state: RootState) => state.auth.token);

    const [formState, inputHandler, setForm] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`
                );

                setLoadedPlace(responseData.place);
                setForm(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true,
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) {
                console.log(err);
            }
        };

        fetchPlace();
    }, [setForm, sendRequest, placeId]);

    const placeUpdateSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const updatePlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}places/${placeId}`,
                    "PATCH",
                    JSON.stringify({
                        title: formState.inputs.title!.value,
                        description: formState.inputs.description!.value,
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }
                );

                console.log(responseData.message);
                history.push(`/${userId}/places`);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        updatePlace();
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace && (
                <form
                    className={classes["place-form"]}
                    onSubmit={placeUpdateSubmitHandler}
                >
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        onInput={inputHandler}
                        initialValue={formState.inputs.title!.value}
                        initialIsValid={formState.inputs.title!.isValid}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MINLENGTH(5),
                        ]}
                        errorText="Please enter a valid description (At least 5 characters)"
                        onInput={inputHandler}
                        initialValue={formState.inputs.description!.value}
                        initialIsValid={formState.inputs.description!.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </>
    );
};

export default UpdatePlace;
