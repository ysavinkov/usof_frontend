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
    Container,
} from "@mui/material";
import { post_post } from "../http/postsAPI";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

import { get_categories } from "../http/categoriesAPI";

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

const PostCreate = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [error, setError] = useState();

    const [newTitle, setTitle] = useState();
    const [newContent, setContent] = useState();
    const [newCategories, setNewCategories] = useState([]);
    const [newStatus, setStatus] = useState("ACTIVE");

    const [allCategories, setAllCategories] = useState([]);

    const handleAddPost = async () => {
        try {
            await post_post(newTitle, newContent, newCategories, newStatus);
            navigate(HOME_ROUTE);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const handleCloseAdd = async () => {
        navigate(HOME_ROUTE);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allCategoriesData = await get_categories();
                setAllCategories(allCategoriesData);
            } catch (e) {
                console.log(e.allCategoriesData?.data?.message);
            }
        };
        fetchData();
    }, []);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <>
                {allCategories && (
                    <Paper key={-1} elevation={3} sx={{ p: 3, width: "100%", height: "100%", position: "relative" }}>
                        <Typography variant="h2">Add new post</Typography>
                        <Form.Control
                            style={{ height: 50, marginLeft: 5, marginBottom: 5 }}
                            className="mt-3"
                            placeholder="Title"
                            value={newTitle}
                            onChange={(e) => setTitle(e.target.value)}
                        />
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
                            <Button onClick={handleAddPost}>Create post</Button>
                            <Button onClick={handleCloseAdd} color="error">
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Paper>
                )}
            </>
        </Container>
    );
});

export default PostCreate;
