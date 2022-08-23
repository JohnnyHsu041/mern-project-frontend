import { useState } from "react";

import Modal from "../../shared/components/UI/Modal";
import Card from "../../shared/components/UI/Card";
import classes from "./PlaceItem.module.css";
import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UI/Map";

const PlaceItem: React.FC<PlaceInfo> = ({
    id,
    image,
    title,
    address,
    description,
    creatorId,
    coordinates,
}) => {
    const [showMap, setShowMap] = useState(false);

    const showMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass={`${classes["place-item__modal-content"]}`}
                footerClass={`${classes["place-item__modal-actions"]}`}
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className={classes["map-container"]}>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>
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
                        <Button inverse onClick={showMapHandler}>
                            VIEW ON MAP
                        </Button>
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
