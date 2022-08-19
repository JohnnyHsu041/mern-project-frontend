import UserList from "../components/UserList";

const Users: React.FC = () => {
    const USERS = [
        {
            id: "u1",
            name: "Johnny",
            image: "https://images.unsplash.com/photo-1604170099361-14f52e9f0c11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80",
            places: 3,
        },
    ];

    return <UserList items={USERS} />;
};

export default Users;
