import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Alert } from "@mui/material";

import { Context } from "../index";
import { password_reset, log_out, password_confirm } from "../http/authAPI";

import { RemoveScrollBar } from "react-remove-scroll-bar";

const Forgot = observer(() => {
    const { token } = useParams();
    const { user } = useContext(Context);

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [confirmError, setConfirmError] = useState();

    const logOut = async () => {
        try {
            user.setUser({});
            user.setIsAuth(false);
            await log_out();
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };

    const click = async () => {
        try {
            const reset_data = await password_reset(email, newPassword);
            logOut();
            setSuccess(reset_data.message);
            setError();
        } catch (e) {
            setSuccess();
            setError(e.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const reset_confirm = await password_confirm(token);
                    setSuccess(reset_confirm.message);
                }
            } catch (e) {
                setConfirmError(e.response?.data?.message);
            }
        };
        fetchData();
    }, [token]);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <RemoveScrollBar />
            {token ? (
                <Card style={{ width: 600 }} className="p-5">
                    {confirmError && (
                        <Alert className="mt-3" severity="error">
                            {confirmError}
                        </Alert>
                    )}
                    {success && (
                        <Alert className="mt-3" severity="success">
                            {success}
                        </Alert>
                    )}
                </Card>
            ) : (
                <Card style={{ width: 600 }} className="p-5">
                    <p className="m-auto">
                        Forgot your account’s password? Enter your email address and we’ll send you a recovery link.
                    </p>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError();
                            }}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setError();
                            }}
                        />
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
                        <Button className="mt-3" variant={"outline-success"} onClick={click}>
                            Send recovery email
                        </Button>
                    </Form>
                </Card>
            )}
        </Container>
    );
});

export default Forgot;
