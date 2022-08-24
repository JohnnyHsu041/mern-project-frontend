import { useParams } from "react-router-dom";

import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import classes from "./PlaceForm.module.css";

const DUMMY_PLACES = [
    new PlaceInfo(
        "p1",
        "Empire State Building",
        "u1",
        "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
        "One of the most famous sky scrappers in the world",
        "350 Fifth Avenue[a]Manhattan, New York 10118",
        {
            lat: 40.748333,
            lng: -73.985278,
        }
    ),
    new PlaceInfo(
        "p2",
        "Empire State Building",
        "u2",
        "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
        "One of the most famous sky scrappers in the world",
        "350 Fifth Avenue[a]Manhattan, New York 10118",
        {
            lat: 40.748333,
            lng: -73.985278,
        }
    ),
    new PlaceInfo(
        "p3",
        "Empire State Building",
        "u3",
        "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
        "One of the most famous sky scrappers in the world",
        "350 Fifth Avenue[a]Manhattan, New York 10118",
        {
            lat: 40.748333,
            lng: -73.985278,
        }
    ),
];

const UpdatePlace: React.FC = () => {
    const placeId = useParams<{ placeId: string }>().placeId;

    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: identifiedPlace!.title,
                isValid: true,
            },
            description: {
                value: identifiedPlace!.description,
                isValid: true,
            },
        },
        true
    );

    const placeUpdateSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        );
    }

    return (
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
                initialValue={formState.inputs.title.value}
                initialIsValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (At least 5 characters)"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialIsValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
