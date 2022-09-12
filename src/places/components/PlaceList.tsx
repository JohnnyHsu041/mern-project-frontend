import Card from "../../shared/components/UI/Card";
import PlaceInfo from "../../models/placeinfo";
import PlaceItem from "./PlaceItem";

import classes from "./PlaceList.module.css";
import Button from "../../shared/components/FormElements/Button";

const PlaceList: React.FC<{
    items: PlaceInfo[];
    onDelete: (placeId: string) => void;
}> = ({ items, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className={`center ${classes["place-list"]}`}>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className={classes["place-list"]}>
            {items.map((place) => {
                return (
                    <PlaceItem
                        key={place.id}
                        id={place.id}
                        title={place.title}
                        image={place.image}
                        description={place.description}
                        creator={place.creator}
                        coordinates={place.coordinates}
                        address={place.address}
                        onDelete={onDelete}
                    />
                );
            })}
        </ul>
    );
};

export default PlaceList;
