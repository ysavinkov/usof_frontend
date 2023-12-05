import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { REGISTER_ROUTE, LOGIN_ROUTE, PASSWORD_RESET, HOME_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

import { Alert } from "@mui/material";

import { Context } from "../index";
import { log_in, registration, email_confirm } from "../http/authAPI";

import { RemoveScrollBar } from "react-remove-scroll-bar";

const Auth = observer(() => {
    const { token } = useParams();
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [confirmError, setConfirmError] = useState();
    const [confirmSuccess, setConfirmSuccess] = useState();

    const click = async () => {
        try {
            if (isLogin) {
                const decoded_token = await log_in(login, email, password);
                user.setUser(decoded_token);
                user.setIsAuth(true);
                navigate(HOME_ROUTE);
                navigate(0);
            } else {
                const reg_data = await registration(login, email, password, confirmPassword);
                setSuccess(reg_data.message);
                setError();
            }
        } catch (e) {
            setSuccess();
            setError(e.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const mail_confirm = await email_confirm(token);
                    setConfirmSuccess(mail_confirm.message);
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
                    {confirmSuccess && (
                        <Alert className="mt-3" severity="success">
                            {confirmSuccess}
                        </Alert>
                    )}
                </Card>
            ) : (
                <Card style={{ width: 600 }} className="p-5">
                    <h2 className="m-auto">{isLogin ? "Log in" : "Register"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Username"
                            value={login}
                            onChange={(e) => {
                                setLogin(e.target.value);
                                setError();
                            }}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError();
                            }}
                        />
                        {isLogin ? (
                            <>
                                <div className="mt-3 align-self-end">
                                    <NavLink to={PASSWORD_RESET}>Forgot password?</NavLink>
                                </div>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError();
                                    }}
                                    type="password"
                                />
                            </>
                        ) : (
                            <>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError();
                                    }}
                                    type="password"
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError();
                                    }}
                                    type="password"
                                />
                            </>
                        )}

                        <Row className="d-flex justify-content-between mt-3">
                            {isLogin ? (
                                <div>
                                    Don’t have an account? <NavLink to={REGISTER_ROUTE}>Register</NavLink>
                                </div>
                            ) : (
                                <div>
                                    Already have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                                </div>
                            )}
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
                                {isLogin ? "Log in" : "Register"}
                            </Button>
                        </Row>
                    </Form>
                </Card>
            )}
        </Container>
    );
});

export default Auth;
