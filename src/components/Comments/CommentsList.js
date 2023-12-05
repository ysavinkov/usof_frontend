import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Box, Grid, Typography, Button, ButtonGroup, Alert } from "@mui/material";
import { post_comment } from "../../http/commentsAPI";
import CommentItem from "./CommentItem.js";
import { useNavigate } from "react-router-dom";

const CommentsList = ({ comments, postId }) => {
    const [newComment, setComment] = useState();
    const [isAdd, setAdd] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleAddComment = async () => {
        if (isAdd === false) {
            setAdd(true);
            return;
        }
        try {
            await post_comment(postId, newComment);
            setAdd(false);
            navigate(0);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const handleCloseAdd = async () => {
        setAdd(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Button onClick={handleAddComment} style={{ backgroundColor: "transparent" }}>
                Add comment
            </Button>
            {isAdd === true && (
                <div>
                    {/* Вікно для додавання коментаря */}
                    <Form.Control
                        style={{ height: 100, marginLeft: 5, marginBottom: 5 }}
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
                        <Button onClick={handleAddComment}>Add comment</Button>
                        <Button onClick={handleCloseAdd} color="error">
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            )}
            {comments.length > 0 && (
                <Typography variant="h5" style={{ marginBottom: "5px" }}>
                    Comments:
                </Typography>
            )}
            <Grid container spacing={2} style={{ marginBottom: "5px" }}>
                {comments.map((comment) => {
                    return (
                        <Grid key={comment.comment_id} item xs={12}>
                            <CommentItem {...comment} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default CommentsList;
