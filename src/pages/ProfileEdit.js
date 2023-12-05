import { Avatar, Button, Container, Alert, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_user, delete_user, patch_user, patch_avatar } from "../http/usersAPI";
import { Card } from "react-bootstrap";
import { HOME_ROUTE } from "../utils/consts";

import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Context } from "../index";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import CustomDialog from "../components/CustomDialog";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ProfileEdit = () => {
    const { id } = useParams();
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [login, setLogin] = useState("");
    const [full_name, setFullName] = useState("");

    const [userData, setUserData] = useState();

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAgree = () => {
        deleteUser();
        handleCloseDialog();
        navigate(HOME_ROUTE);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_user(id);
                delete response.password;
                setUserData(response);
                setLogin(response.login);
                setFullName(response.full_name);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [id]);

    const handleFileChange = (event) => {
        setError();
        setSuccess();
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            patchUser();
            if (selectedFile) {
                patchAvatar();
            }
        } catch (error) {
            setError("Error during upload: ", error.response?.data?.message || error.message);
        }
    };

    const patchAvatar = async () => {
        try {
            const patch_result = await patch_avatar(selectedFile);

            setSuccess(patch_result.message);
            setTimeout(() => {
                navigate(0);
            }, 1000);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const patchUser = async () => {
        try {
            const patch_result = await patch_user(user.user.user_id, login, full_name);

            setSuccess(patch_result.message);
            setTimeout(() => {
                navigate(0);
            }, 1000);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    const deleteUser = async () => {
        try {
            await delete_user(user.user.user_id);
            user.setUser({});
            user.setIsAuth(false);
        } catch (e) {
            setError(e.response?.data?.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <RemoveScrollBar />
            {userData && id == user.user?.user_id && (
                <Card style={{ width: 600 }} className="p-5">
                    {userData && (
                        <div style={{ display: "flex" }}>
                            <div>
                                <h3>Edit Profile</h3>
                                <Avatar
                                    src={process.env.REACT_APP_API_URL + `api/users/${id}/avatar`}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        marginLeft: 3,
                                        marginRight: 5,
                                        display: "block",
                                    }}
                                />
                                <Button
                                    className="mt-3"
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    New Avatar
                                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                </Button>
                                <Typography
                                    variant="h6"
                                    style={{
                                        maxWidth: "150px",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                    title={selectedFile?.name}
                                >
                                    {selectedFile?.name}
                                </Typography>
                            </div>
                            <div>
                                <Form className="d-flex flex-column">
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Login"
                                        value={login}
                                        onChange={(e) => {
                                            setLogin(e.target.value);
                                            setError();
                                            setSuccess();
                                        }}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Full Name"
                                        value={full_name}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                            setError();
                                            setSuccess();
                                        }}
                                    />
                                </Form>
                                {error && (
                                    <Alert className="mt-3" severity="error">
                                        {error}
                                    </Alert>
                                )}
                                {success && (
                                    <Alert className="mt-3" severity="success">
                                        {success}
                                    </Alert>
                                )}
                                <Button className="mt-3" variant="contained" color="success" onClick={handleUpload}>
                                    Confirm changes
                                </Button>
                                <Button className="mt-3" variant="contained" color="error" onClick={handleOpenDialog}>
                                    Delete account
                                </Button>
                                <CustomDialog
                                    title={"Delete account"}
                                    content={
                                        <>
                                            Do you really wish to delete your account?
                                            <br />
                                            All data, including posts and comments, will be lost!
                                        </>
                                    }
                                    open={isDialogOpen}
                                    agree={handleAgree}
                                    onClose={handleCloseDialog}
                                />
                            </div>
                        </div>
                    )}
                </Card>
            )}
        </Container>
    );
};

export default ProfileEdit;
