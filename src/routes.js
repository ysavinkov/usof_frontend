import {
    REGISTER_ROUTE,
    LOGIN_ROUTE,
    PASSWORD_RESET,
    HOME_ROUTE,
    POSTS_ROUTE,
    CATEGORIES_ROUTE,
    USERS_ROUTE,
    PROFILE_ROUTE,
    POST_CREATE,
} from "./utils/consts";
import Auth from "./pages/Auth";
import Forgot from "./pages/Forgot";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Categories from "./pages/Categories";
import CategoryPosts from "./pages/CategoryPosts";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";

export const authRoutes = [
    {
        path: PROFILE_ROUTE + "/:id/edit",
        Component: ProfileEdit,
    },
    {
        path: POST_CREATE,
        Component: PostCreate,
    },
    {
        path: POSTS_ROUTE + "/:id/edit",
        Component: PostEdit,
    },
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTER_ROUTE + "/:token",
        Component: Auth,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: PASSWORD_RESET,
        Component: Forgot,
    },
    {
        path: PASSWORD_RESET + "/:token",
        Component: Forgot,
    },
    {
        path: POSTS_ROUTE + "/:id",
        Component: Post,
    },
    {
        path: CATEGORIES_ROUTE,
        Component: Categories,
    },
    {
        path: CATEGORIES_ROUTE + "/:id/posts",
        Component: CategoryPosts,
    },
    {
        path: USERS_ROUTE,
        Component: Users,
    },
    {
        path: PROFILE_ROUTE + "/:id",
        Component: Profile,
    },
];
