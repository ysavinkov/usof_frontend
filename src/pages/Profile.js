import { Avatar, Button, Chip, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { get_user } from "../http/usersAPI";
import { Card } from "react-bootstrap";
import { HOME_ROUTE, PROFILE_ROUTE } from "../utils/consts";

import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Context } from "../index";

import { dateFormatter } from "../utils/dateFormatter";

const Profile = () => {
    const { id } = useParams();
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_user(id);
                delete response.password;
                setUserData(response);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        // if (typeof userData === undefined) {
        //     navigate(HOME_ROUTE);
        // }
    }, [id]);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <RemoveScrollBar />
            {userData && (
                <Card style={{ width: 600 }} className="p-5">
                    <div style={{ display: "flex" }}>
                        <div>
                            <h3>Profile</h3>
                            <Avatar
                                src={process.env.REACT_APP_API_URL + `api/users/${id}/avatar`}
                                sx={{ width: 100, height: 100, marginRight: 5, display: "block" }}
                            />
                            <Typography className="mt-2" sx={{ mb: 1 }} variant="h5">
                                {userData.login}
                                <br />
                                <Chip className="mt-2" label={userData.role} />
                            </Typography>
                        </div>
                        <div style={{ width: "100%" }}>
                            <Typography variant="h6">Member from: {dateFormatter(userData.createdAt)}</Typography>
                            <Typography variant="h6">Full name: {userData.full_name}</Typography>
                            <Typography variant="h6">
                                Email: <a href={`mailto:${userData.email}`}>{userData.email}</a>
                            </Typography>
                            <Typography variant="h6">Rating: {userData.rating} &#9733;</Typography>
                            {id == user.user?.user_id && (
                                <div>
                                    <hr />
                                    <Link to={PROFILE_ROUTE + "/" + user.user?.user_id + "/edit"}>
                                        <Button variant="contained">Edit Profile</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </Container>
    );
};

export default Profile;
