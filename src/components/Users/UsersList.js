import React from "react";
import { Box, Grid } from "@mui/material";
import UserItem from "./UserItem.js";

const UsersList = ({ users }) => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "54px" }}>
            <Grid container spacing={2}>
                {users.map((user) => {
                    return (
                        <Grid key={user.user_id} item xs={12} sm={6} md={4} lg={3}>
                            <UserItem {...user} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default UsersList;
