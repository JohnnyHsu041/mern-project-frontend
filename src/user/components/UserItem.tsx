import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UI/Avatar";
import Card from "../../shared/components/UI/Card";
import classes from "./UserItem.module.css";

interface UserItemProps {
    id: string;
    name: string;
    image: string;
    placeCount: number;
}

const UserItem: React.FC<UserItemProps> = (props) => {
    return (
        <li className={classes["user-item"]}>
            <Card className={classes["user-item__content"]}>
                <Link to={`/${props.id}/places`}>
                    <div className={classes["user-item__image"]}>
                        <Avatar image={props.image} alt={props.name} />
                    </div>
                    <div className={classes["user-item__info"]}>
                        <h2>{props.name}</h2>
                        <h3>
                            {props.placeCount}{" "}
                            {props.placeCount === 1 ? "Place" : "Places"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
