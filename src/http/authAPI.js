import { $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const checkWho = async () => {
    const { data } = await $host.get("api/auth");
    return data;
};

export const registration = async (login, email, password, confirmPassword) => {
    const { data } = await $host.post("api/auth/register", { login, email, password, confirmPassword });
    return data;
};

export const log_in = async (login, email, password) => {
    const { data } = await $host.post("api/auth/login", { login, email, password });
    return jwtDecode(data.accessToken);
};

export const log_out = async () => {
    const { data } = await $host.post("api/auth/logout");
    return data;
};

export const password_reset = async (email, newPassword) => {
    const { data } = await $host.post("api/auth/password-reset", { email, newPassword });
    return data;
};

export const password_confirm = async (token) => {
    const { data } = await $host.get(`api/auth/password-reset/${token}`);
    return data;
};

export const email_confirm = async (token) => {
    const { data } = await $host.get(`api/auth/verify-email/${token}`);
    return data;
};
