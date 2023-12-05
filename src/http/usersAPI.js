import { $host } from "./index";

export const get_users = async () => {
    const { data } = await $host.get(`api/users`);
    return data;
};

export const get_user = async (userId) => {
    const { data } = await $host.get(`api/users/${userId}`);
    return data;
};

export const patch_avatar = async (avatar) => {
    const { data } = await $host.patch(
        `api/users/avatar`,
        { avatar },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return data;
};

export const patch_user = async (userId, login, full_name) => {
    const { data } = await $host.patch(`api/users/${userId}`, { login, full_name });
    return data;
};

export const delete_user = async (userId) => {
    const { data } = await $host.delete(`api/users/${userId}`);
    return data;
};
