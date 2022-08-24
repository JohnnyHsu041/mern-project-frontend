import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Input from "../../shared/components/FormElements/Input";
import classes from "./NewPlace.module.css";

const NewPlace: React.FC = () => {
    return (
        <form className={classes["place-form"]}>
            <Input
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
            />
        </form>
    );
};

export default NewPlace;
