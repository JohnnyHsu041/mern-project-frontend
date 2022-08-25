import { useState } from "react";

import Modal from "../../shared/components/UI/Modal";
import Card from "../../shared/components/UI/Card";
import classes from "./PlaceItem.module.css";
import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UI/Map";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const showMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteModalHandler = () => setShowDeleteModal(true);
    const closeDeleteModalHandler = () => setShowDeleteModal(false);

    const confirmDeleteHandler = () => {
        console.log("Deleting...");
    };

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
            <Modal
                show={showDeleteModal}
                onCancel={closeDeleteModalHandler}
                header="Are you sure?"
                footerClass={`${classes["place-item__modal-actions"]}`}
                footer={
                    <>
                        <Button inverse onClick={closeDeleteModalHandler}>
                            Cancel
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            Confirm
                        </Button>
                    </>
                }
            >
                <p>
                    Do you want to proceed and delete this place? Please note
                    that it cannot be undone thereafter.
                </p>
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
                        {isLoggedIn && (
                            <Button to={`/places/${id}`}>EDIT</Button>
                        )}
                        {isLoggedIn && (
                            <Button danger onClick={showDeleteModalHandler}>
                                DELETE
                            </Button>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
