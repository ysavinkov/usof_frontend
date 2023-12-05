import React, { useEffect, useState } from "react";
import { Link, Paper, Avatar, Typography, Chip } from "@mui/material";
import { POSTS_ROUTE } from "../../utils/consts";
import { get_user } from "../../http/usersAPI";
import { get_categories_of_post } from "../../http/postsAPI";

import { dateTimeFormatter } from "../../utils/dateFormatter";

const PostItem = ({ post_id, author_id, title, content, rating, createdAt }) => {
    const [user, setUser] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await get_user(author_id);
                setUser(userData);
                const categoriesData = await get_categories_of_post(post_id);
                setCategories(categoriesData);
            } catch (e) {
                console.log(e.userData?.data?.message);
                console.log(e.categoriesData?.data?.message);
            }
        };
        fetchData();
    }, [author_id, post_id]);

    return (
        <>
            {user && categories && (
                <Link style={{ color: "black" }} underline="none" href={POSTS_ROUTE + "/" + post_id}>
                    <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%", position: "relative" }}>
                        <Typography
                            className="mb-2"
                            variant="h4"
                            style={{
                                maxWidth: "85%",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                            title={title}
                        >
                            {title}
                        </Typography>
                        <div className="mb-2" style={{ display: "flex" }}>
                            <Avatar
                                alt={user.login}
                                src={process.env.REACT_APP_API_URL + `api/users/${author_id}/avatar`}
                            />
                            <Typography className="ms-2 mt-1" variant="p">
                                {user.login}
                            </Typography>
                        </div>
                        <Typography
                            variant="h6"
                            style={{
                                maxWidth: "85%",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                            title={content}
                        >
                            {content}
                        </Typography>
                        <div style={{ display: "flex" }}>
                            {categories.map((category) => {
                                return <Chip key={category.category_id} className="me-2" label={category.title} />;
                            })}
                        </div>
                        <Typography
                            variant="p"
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                padding: "4px",
                                borderRadius: "4px",
                            }}
                        >
                            Post rating: {rating} &#9733;
                        </Typography>
                        <Typography
                            variant="p"
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                padding: "4px",
                                borderRadius: "4px",
                            }}
                        >
                            Asked on: {dateTimeFormatter(createdAt)}
                        </Typography>
                    </Paper>
                </Link>
            )}
        </>
    );
};

export default PostItem;
