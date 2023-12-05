import React, { useEffect, useState } from "react";
import { get_posts } from "../http/postsAPI";
import { Container, Typography, Button } from "@mui/material";
import PostsList from "../components/Posts/PostsList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext } from "react";
import Pages from "../components/Pages";

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { POST_CREATE } from "../utils/consts";
import Sorting from "../components/Sorting";

const Home = observer(() => {
    const { user, poststore } = useContext(Context);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_posts();
                setPosts(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_posts({
                    page: poststore.page,
                    sortBy: poststore.sortBy,
                    sortOrder: poststore.sortOrder,
                });
                setPosts(response);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        fetchData();
    }, [poststore.page, poststore.sortBy, poststore.sortOrder]);

    const handleCreatePost = () => {
        navigate(POST_CREATE);
    };

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
                <Typography variant="h3" style={{ marginTop: "10px" }}>
                    Posts
                </Typography>
                {user.isAuth && (
                    <Button
                        onClick={handleCreatePost}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ height: "70%" }}
                        className="mt-3"
                    >
                        Add post
                    </Button>
                )}
            </div>
            {posts.rows && (
                <>
                    {poststore.setCount(posts.count)}
                    <Sorting />
                    <PostsList posts={posts.rows} />
                    <Pages />
                </>
            )}
        </Container>
    );
});

export default Home;
