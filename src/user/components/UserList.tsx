import classes from "./style/css/UserList.module.css";
import UserItem from "./UserItem";
import Card from "../../shared/components/UI/Card";

interface ItemsProps {
    items: { id: string; image: string; name: string; places: number }[];
}

const UserList: React.FC<ItemsProps> = ({ items }) => {
    if (items.length === 0) {
        return (
            <div className={classes.center}>
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className={classes["user-list"]}>
            {items.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}
                />
            ))}
        </ul>
    );
};

export default UserList;
