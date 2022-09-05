import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import UserList from "../components/UserList";

type User = {
    id: string;
    image: string;
    name: string;
    places: string[];
};

const Users: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadedUsers, setLoadedUsers] = useState<User[]>([]);

    useEffect(() => {
        const getAllUser = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(
                    "http://localhost:8080/api/users/"
                );
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err: any) {
                setError(err.message);
            }

            setIsLoading(false);
        };

        getAllUser();
    }, []);

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </>
    );
};

export default Users;
