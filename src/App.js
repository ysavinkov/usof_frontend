import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { checkWho } from "./http/authAPI";
import { Context } from "./index";
import { Container, Spinner } from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await checkWho();
                user.setUser(data);
                user.setIsAuth(true);
            } catch (error) {
                user.setUser();
                user.setIsAuth(false);

                console.log(error.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return (
            <Container>
                <div>
                    <Spinner animation={"grow"} />
                </div>
            </Container>
        );
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
