import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceInfo from "../../models/placeinfo";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";

const UserPlaces: React.FC = () => {
    const userId = useParams<{ userId: string }>().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState<PlaceInfo[]>([]);

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}places/user/${userId}`
                );

                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };

        fetchUserPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (placeId: string) => {
        setLoadedPlaces((prevState) =>
            prevState.filter((place) => place.id !== placeId)
        );
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedPlaces && (
                <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
            )}
        </>
    );
};

export default UserPlaces;
