import React, { useContext, useState, useEffect } from "react";
import { Container, Button, ButtonGroup } from "@mui/material";
import DisplayPost from "../components/Posts/DisplayPost";
import { useParams, useNavigate } from "react-router-dom";
import { get_post, get_comments_of_post, delete_post } from "../http/postsAPI";
import { HOME_ROUTE, POSTS_ROUTE } from "../utils/consts";

import { Context } from "../index";
import CommentsList from "../components/Comments/CommentsList";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomDialog from "../components/CustomDialog";

const Post = () => {
    const { id } = useParams();

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await get_post(id);
                setPost(postData);
                const commentsData = await get_comments_of_post(postData.post_id);
                setComments(commentsData);
            } catch (e) {
                console.log(e.postData?.data?.message);
            }
        };
        fetchData();
    }, [id]);

    return (
        <Container>
            {post && (
                <>
                    <br />
                    <DisplayPost {...post} />
                    <CommentsList comments={comments} postId={post.post_id} />
                </>
            )}
        </Container>
    );
};

export default Post;
