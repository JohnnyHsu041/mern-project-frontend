import { useState } from "react";

import Modal from "../../shared/components/UI/Modal";
import Card from "../../shared/components/UI/Card";
import classes from "./PlaceItem.module.css";
import PlaceInfo from "../../models/placeinfo";
import Button from "../../shared/components/FormElements/Button";
import Map from "../../shared/components/UI/Map";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";

const PlaceItem: React.FC<PlaceInfo> = ({
    id,
    image,
    title,
    address,
    description,
    creator,
    coordinates,
    onDelete,
}) => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const userId = useSelector((state: RootState) => state.auth.userId);
    const token = useSelector((state: RootState) => state.auth.token);

    const showMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteModalHandler = () => setShowDeleteModal(true);
    const closeDeleteModalHandler = () => setShowDeleteModal(false);

    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);

        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}places/${id}`,
                "DELETE",
                null,
                { Authorization: "Bearer " + token }
            );
            onDelete!(id);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
                    {isLoading && <LoadingSpinner asOverlay />}
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
                        {userId === creator && (
                            <Button to={`/places/${id}`}>EDIT</Button>
                        )}
                        {userId === creator && (
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
