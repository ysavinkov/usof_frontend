import React from "react";
import { Link, Paper, Typography, Chip } from "@mui/material";
import { CATEGORIES_ROUTE } from "../../utils/consts";

const UserItem = ({ category_id, title, description }) => {
    return (
        <Link style={{ color: "black" }} underline="none" href={CATEGORIES_ROUTE + "/" + category_id + "/posts"}>
            <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%" }}>
                <Chip label={title} />
                <Typography variant="h6">{description}</Typography>
            </Paper>
        </Link>
    );
};

export default UserItem;
