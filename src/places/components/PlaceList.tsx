import Card from "../../shared/components/UI/Card";
import PlaceInfo from "../../models/placeinfo";
import PlaceItem from "./PlaceItem";

import classes from "./PlaceList.module.css";
import Button from "../../shared/components/FormElements/Button";

const PlaceList: React.FC<{ items: PlaceInfo[] }> = ({ items }) => {
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
                        creatorId={place.creatorId}
                        coordinates={place.coordinates}
                        address={place.address}
                    />
                );
            })}
        </ul>
    );
};

export default PlaceList;
