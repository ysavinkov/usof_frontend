import React from "react";
import { Link, Paper, Avatar, Typography, Chip } from "@mui/material";
import { PROFILE_ROUTE } from "../../utils/consts";

const UserItem = ({ user_id, login, rating, role }) => {
    return (
        <Link style={{ color: "black" }} underline="none" href={PROFILE_ROUTE + "/" + user_id}>
            <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%" }}>
                <Avatar alt={login} src={process.env.REACT_APP_API_URL + `api/users/${user_id}/avatar`} />
                <div style={{ display: "flex" }}>
                    <Typography variant="h6">{login}</Typography>
                    <Chip className="ms-2" label={role} />
                </div>
                <Typography variant="h6">Rating: {rating} &#9733;</Typography>
            </Paper>
        </Link>
    );
};

export default UserItem;
