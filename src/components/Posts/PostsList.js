import React from "react";
import { Box, Grid } from "@mui/material";
import PostItem from "./PostItem.js";

const PostsList = ({ posts }) => {
    return (
        <Box sx={{ flexGrow: 1, marginTop: "54px" }}>
            <Grid container spacing={2}>
                {posts.map((post) => {
                    return (
                        <Grid key={post.post_id} item xs={12}>
                            <PostItem {...post} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default PostsList;
