import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_posts_with_categories, get_category } from "../http/categoriesAPI";
import { Container, Typography } from "@mui/material";
import PostsList from "../components/Posts/PostsList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useContext } from "react";
import Pages from "../components/Pages";
import Sorting from "../components/Sorting";

const CategoryPosts = observer(() => {
    const { poststore } = useContext(Context);

    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await get_posts_with_categories(id);
                setPosts(postsData);
                const categoryData = await get_category(id);
                setCategory(categoryData);
            } catch (e) {
                console.log(e.postsData?.data?.message);
                console.log(e.categoryData?.data?.message);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_posts_with_categories(id, { page: poststore.page });
                setPosts(response);
                const categoryData = await get_category(id);
                setCategory(categoryData);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        };
        fetchData();
    }, [poststore.page]);

    return (
        <Container>
            {category ? (
                <>
                    <Typography variant="h3" style={{ marginTop: "10px" }}>
                        Posts with category "{category.title}"
                    </Typography>
                    {posts.rows && (
                        <>
                            {poststore.setCount(posts.count)}
                            <Sorting />
                            <PostsList posts={posts.rows} />
                            <Pages />
                        </>
                    )}
                </>
            ) : (
                <Typography variant="h3" style={{ marginTop: "10px" }}>
                    No posts with this category
                </Typography>
            )}
        </Container>
    );
});

export default CategoryPosts;
