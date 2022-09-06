import { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import UserList from "../components/UserList";
import { useHttpClient } from "../../shared/hooks/http-hook";

type User = {
    id: string;
    image: string;
    name: string;
    places: string[];
};

const Users: React.FC = () => {
    const [loadedUsers, setLoadedUsers] = useState<User[]>([]);
    const { isLoading, sendRequest, error, clearError } = useHttpClient();

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:8080/api/users/"
                );

                setLoadedUsers(responseData.users);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        getAllUser();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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
