import React, { useContext, useState } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    PROFILE_ROUTE,
    POSTS_ROUTE,
    CATEGORIES_ROUTE,
    USERS_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { log_out } from "../http/authAPI";

import { Link, Avatar } from "@mui/material";

import CustomDialog from "./CustomDialog";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleAgree = () => {
        logOut();
        handleCloseDialog();
    };

    const logOut = async () => {
        try {
            user.setUser({});
            user.setIsAuth(false);
            await log_out();
            navigate(HOME_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="ms-left" style={{ color: "white" }}>
                    <Link href={HOME_ROUTE}>
                        <Avatar alt={"USOF"} src={process.env.PUBLIC_URL + "/logo512.png"} />
                    </Link>
                    <Link style={{ color: "white" }} underline="none" href={CATEGORIES_ROUTE} className="ms-5 mt-2">
                        Categories
                    </Link>
                    <Link style={{ color: "white" }} underline="none" href={USERS_ROUTE} className="ms-5 mt-2">
                        Users
                    </Link>
                </Nav>
                {user.isAuth ? (
                    <Nav className="ms-auto" style={{ color: "white" }}>
                        <Link href={PROFILE_ROUTE + "/" + user.user.user_id}>
                            <Avatar
                                alt={user.user.login}
                                src={process.env.REACT_APP_API_URL + `api/users/${user.user.user_id}/avatar`}
                            />
                        </Link>
                        {user.user.role === "ADMIN" && (
                            <Button
                                variant={"outline-light"}
                                onClick={() => openInNewTab(process.env.REACT_APP_API_URL + "admin")}
                                className="ms-2"
                            >
                                Admin Panel
                            </Button>
                        )}
                        <Button variant={"outline-light"} onClick={handleOpenDialog} className="ms-2">
                            Quit
                        </Button>
                        <CustomDialog
                            title={"Log out"}
                            content={"Do you really wish to quit?"}
                            open={isDialogOpen}
                            agree={handleAgree}
                            onClose={handleCloseDialog}
                        />
                    </Nav>
                ) : (
                    <Nav className="ms-auto" style={{ color: "white" }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>
                            Log in
                        </Button>
                        <Button variant={"outline-light"} onClick={() => navigate(REGISTER_ROUTE)} className="ms-2">
                            Register
                        </Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
