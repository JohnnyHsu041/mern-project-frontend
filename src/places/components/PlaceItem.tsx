import Card from "../../shared/components/UI/Card";
import classes from "./PlaceItem.module.css";
import PlaceInfo from "../../models/placeinfo";

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
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
