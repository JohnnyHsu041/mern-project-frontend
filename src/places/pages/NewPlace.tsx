import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import classes from "./PlaceForm.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory as History } from "react-router-dom";

const NewPlace: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const token = useSelector((state: RootState) => state.auth.token);
    const history = History();
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const placeSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const addNewPlace = async () => {
            try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}places/`,
                    "POST",
                    JSON.stringify({
                        title: formState.inputs.title!.value,
                        description: formState.inputs.description!.value,
                        address: formState.inputs.address!.value,
                        creator: userId,
                    }),
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }
                );

                // Redirect to a different page
                history.push("/");
            } catch (err: any) {
                console.log(err.message);
            }
        };

        addNewPlace();
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            <form
                className={classes["place-form"]}
                onSubmit={placeSubmitHandler}
            >
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
        </>
    );
};

export default NewPlace;
