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
                    `http://localhost:8080/api/places/user/${userId}`
                );

                setLoadedPlaces(responseData.places);
            } catch (err) {}
        };

        fetchUserPlaces();
    }, [sendRequest, userId]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
        </>
    );
};

export default UserPlaces;
