import React, { useEffect, useState, useContext } from "react";
import { Form } from "react-bootstrap";
import {
    Link,
    Paper,
    Avatar,
    Typography,
    Chip,
    Button,
    ButtonGroup,
    Select,
    OutlinedInput,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Alert,
} from "@mui/material";
import { PROFILE_ROUTE, CATEGORIES_ROUTE, HOME_ROUTE } from "../../utils/consts";
import { get_user } from "../../http/usersAPI";
import {
    get_categories_of_post,
    patch_post,
    delete_post,
    get_likes,
    post_like,
    delete_like,
} from "../../http/postsAPI";
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
import { get_categories } from "../../http/categoriesAPI";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const DisplayPost = ({ post_id, author_id, title, content, rating, status, createdAt }) => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [isEdit, setEdit] = useState(false);
    const [isLike, setLike] = useState(false);
    const [isDislike, setDislike] = useState(false);
    const [error, setError] = useState();

    const [newTitle, setTitle] = useState();
    const [newContent, setContent] = useState();
    const [newCategories, setNewCategories] = useState([]);
    const [newStatus, setStatus] = useState();

    const [userInfo, setUserInfo] = useState();
    const [postCategories, setPostCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAgree = () => {
        deletePost();
        handleCloseDialog();
        navigate(HOME_ROUTE);
        navigate(0);
    };

    const deletePost = async () => {
        try {
            await delete_post(post_id);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const handleEditPost = async () => {
        if (isEdit === false) {
            setEdit(true);
            setTitle(title);
            setContent(content);
            setStatus(status);
            {
                postCategories.map((cat) => newCategories.push(cat.title));
            }
            return;
        }
        try {
            await patch_post(post_id, newTitle, newContent, newCategories, newStatus);
            setEdit(false);
            navigate(0);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const handleCloseEdit = async () => {
        setEdit(false);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewCategories(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleLike = async () => {
        if (isLike === false) {
            try {
                const type = "LIKE";
                await post_like(post_id, type);
                setLike(true);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        } else {
            try {
                await delete_like(post_id);
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
                await post_like(post_id, type);
                setDislike(true);
                navigate(0);
            } catch (e) {
                console.log(e.response?.data?.message);
            }
        } else {
            try {
                await delete_like(post_id);
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
                const categoriesData = await get_categories_of_post(post_id);
                setPostCategories(categoriesData);
                const allCategoriesData = await get_categories();
                setAllCategories(allCategoriesData);
                if (isEdit === false) {
                    const likes = await get_likes(post_id);
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
                console.log(e.categoriesData?.data?.message);
                console.log(e.allCategoriesData?.data?.message);
            }
        };
        fetchData();
    }, [author_id, post_id]);

    return (
        <>
            {userInfo && postCategories && (
                <Paper key={post_id} elevation={3} sx={{ p: 3, width: "100%", height: "100%", position: "relative" }}>
                    {isEdit === true ? (
                        <div>
                            {/* Вікно для додавання коментаря */}
                            <Form.Control
                                style={{ height: 50, marginLeft: 5, marginBottom: 5 }}
                                className="mt-3"
                                placeholder="Title"
                                value={newTitle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    ) : (
                        <>
                            <Typography
                                className="mb-2"
                                variant="h4"
                                style={{
                                    maxWidth: "85%",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {title}
                            </Typography>
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
                        </>
                    )}
                    {isEdit === true ? (
                        <div>
                            <Form.Control
                                style={{ height: 50, marginLeft: 5, marginBottom: 5 }}
                                className="mt-3"
                                placeholder="New Content"
                                value={newContent}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={newCategories}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {allCategories.map((cat) => (
                                        <MenuItem key={cat.category_id} value={cat.title}>
                                            {cat.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            {/* <Form.Control
                                style={{ height: 50, marginLeft: 5, marginBottom: 5 }}
                                className="mt-3"
                                placeholder="New Status"
                                value={newStatus}
                                onChange={(e) => setStatus(e.target.value)}
                            /> */}
                            {error && (
                                <Alert className="mt-3" severity="error">
                                    {error}
                                </Alert>
                            )}
                            <ButtonGroup variant="contained">
                                <Button onClick={handleEditPost}>Edit post</Button>
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
                            >
                                {content}
                            </Typography>
                            <div style={{ display: "flex" }}>
                                {postCategories.map((category) => {
                                    return (
                                        <Link
                                            key={category.category_id}
                                            href={CATEGORIES_ROUTE + "/" + category.category_id + "/posts"}
                                        >
                                            <Chip className="me-2" label={category.title} />
                                        </Link>
                                    );
                                })}
                            </div>
                            {author_id == user.user?.user_id ? (
                                <>
                                    <ButtonGroup variant="contained">
                                        <Button onClick={handleEditPost} color="success" startIcon={<EditIcon />}>
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
            )}
        </>
    );
};

export default DisplayPost;
