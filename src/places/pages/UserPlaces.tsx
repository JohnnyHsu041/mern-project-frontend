import { useParams } from "react-router-dom";

import PlaceInfo from "../../models/placeinfo";
import PlaceList from "../components/PlaceList";

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

const UserPlaces: React.FC = () => {
    const userId = useParams<{ userId: string }>().userId;
    const loadedPlace = DUMMY_PLACES.filter(
        (place) => place.creatorId === userId
    );

    return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
