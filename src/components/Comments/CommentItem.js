import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, Paper, Avatar, Typography, Button, ButtonGroup, Alert } from "@mui/material";
import { PROFILE_ROUTE } from "../../utils/consts";
import { get_user } from "../../http/usersAPI";
import { get_likes, post_like, patch_comment, delete_comment, delete_like } from "../../http/commentsAPI";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import CustomDialog from "../CustomDialog";

import { dateTimeFormatter } from "../../utils/dateFormatter";

const CommentItem = ({ comment_id, author_id, post_id, content, rating, createdAt, updatedAt }) => {
    const { user } = useContext(Context);
    const [userInfo, setUserInfo] = useState();
    const [newComment, setComment] = useState(content);
    const [isEdit, setEdit] = useState(false);
    const [isLike, setLike] = useState(false);
    const [isDislike, setDislike] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAgree = () => {
        deleteComment();
        handleCloseDialog();
        navigate(0);
    };

    const handleEditComment = async () => {
        if (isEdit === false) {
            setEdit(true);
            return;
        }
        try {
            await patch_comment(comment_id, newComment);
            setEdit(false);
            navigate(0);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const handleCloseEdit = async () => {
        setEdit(false);
    };

    const deleteComment = async () => {
        try {
            await delete_comment(comment_id);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const handleLike = async () => {
        if (isLike === false) {
            try {
                const type = "LIKE";
                await post_like(comment_id, type);
                setLike(true);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        } else {
            try {
                await delete_like(comment_id);
                setLike(false);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        }
    };

    const handleDislike = async () => {
        if (isDislike === false) {
            try {
                const type = "DISLIKE";
                await post_like(comment_id, type);
                setDislike(true);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        } else {
            try {
                await delete_like(comment_id);
                setDislike(false);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await get_user(author_id);
                setUserInfo(userData);
                if (isEdit === false) {
                    const likes = await get_likes(comment_id);
                    likes?.map((like) => {
                        if (like.author_id == user.user?.user_id && like.type === "LIKE") {
                            setLike(true);
                        }
                        if (like.author_id == user.user?.user_id && like.type === "DISLIKE") {
                            setDislike(true);
                        }
                    });
                }
            } catch (e) {
                console.log(e.userData?.data?.message);
            }
        };
        fetchData();
    }, [author_id]);

    return (
        <>
            {userInfo && (
                <Paper
                    key={comment_id}
                    elevation={3}
                    sx={{ p: 3, width: "100%", height: "100%", position: "relative" }}
                >
                    <div className="mb-2" style={{ display: "flex" }}>
                        <Link href={PROFILE_ROUTE + "/" + author_id}>
                            <Avatar
                                alt={userInfo.login}
                                src={process.env.REACT_APP_API_URL + `api/users/${author_id}/avatar`}
                            />
                        </Link>
                        <Typography className="ms-2 mt-1" variant="p">
                            {userInfo.login}
                        </Typography>
                    </div>
                    {isEdit === true ? (
                        <div>
                            <Form.Control
                                style={{ height: 50, marginLeft: 5, marginBottom: 5 }}
                                className="mt-3"
                                placeholder="Comment's content"
                                value={newComment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                    setError();
                                }}
                            />
                            {error && (
                                <Alert className="mt-3" severity="error">
                                    {error}
                                </Alert>
                            )}
                            <ButtonGroup variant="contained">
                                <Button onClick={handleEditComment}>Edit comment</Button>
                                <Button onClick={handleCloseEdit} color="error">
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                style={{
                                    maxWidth: "85%",
                                    overflowWrap: "break-word",
                                }}
                                title={content}
                            >
                                {content}
                            </Typography>
                            {author_id == user.user?.user_id ? (
                                <>
                                    <ButtonGroup variant="contained">
                                        <Button onClick={handleEditComment} color="success" startIcon={<EditIcon />}>
                                            Edit
                                        </Button>
                                        <Button onClick={handleOpenDialog} color="error" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                    <CustomDialog
                                        title={"Delete comment"}
                                        content={<>Do you really wish to delete this comment?</>}
                                        open={isDialogOpen}
                                        agree={handleAgree}
                                        onClose={handleCloseDialog}
                                    />
                                </>
                            ) : (
                                <>
                                    <ButtonGroup variant="contained">
                                        <Button
                                            onClick={handleLike}
                                            color="success"
                                            startIcon={isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                                        ></Button>
                                        <Button
                                            onClick={handleDislike}
                                            color="error"
                                            startIcon={isDislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                                        ></Button>
                                    </ButtonGroup>
                                </>
                            )}
                        </>
                    )}
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
                        Comment rating: {rating} &#9733;
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
                        Commented on: {dateTimeFormatter(updatedAt)}
                    </Typography>
                </Paper>
            )}
        </>
    );
};

export default CommentItem;
