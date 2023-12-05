import React, { useEffect, useState } from "react";
import { get_users } from "../http/usersAPI";
import { Container, Typography } from "@mui/material";

import UsersList from "../components/Users/UsersList";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_users();
                setUsers(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h3" style={{ marginTop: "10px" }}>
                Users
            </Typography>
            {users && <UsersList users={users} />}
        </Container>
    );
};

export default Users;
