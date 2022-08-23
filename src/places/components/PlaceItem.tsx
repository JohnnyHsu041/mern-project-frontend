import Card from "../../shared/components/UI/Card";
import classes from "./PlaceItem.module.css";
import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";

const PlaceItem: React.FC<PlaceInfo> = ({
    id,
    image,
    title,
    address,
    description,
    creatorId,
}) => {
    return (
        <li className={classes["place-item"]}>
            <Card className={classes["place-item__content"]}>
                <div className={classes["place-item__image"]}>
                    <img src={image} alt={title} />
                </div>
                <div className={classes["place-item__info"]}>
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className={classes["place-item__actions"]}>
                    <Button inverse>VIEW ON MAP</Button>
                    <Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
