import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

import { Alert, Typography } from "@mui/material";

import { Context } from "../index";

const PostEdit = observer(() => {
    const { id } = useParams();
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [confirmError, setConfirmError] = useState();
    const [confirmSuccess, setConfirmSuccess] = useState();

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Typography>edit</Typography>
        </Container>
    );
});

export default PostEdit;
