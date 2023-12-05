import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/userStore";
import PostsStore from "./store/postsStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            poststore: new PostsStore(),
        }}
    >
        <App />
    </Context.Provider>
);
