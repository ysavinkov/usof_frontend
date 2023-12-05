import { $host } from "./index";

export const get_posts = async ({ page = 1, limit = 5, sortBy = "rating", sortOrder = "DESC" }) => {
    const { data } = await $host.get(`api/posts?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
    return data;
};

export const get_post = async (postId) => {
    const { data } = await $host.get(`api/posts/${postId}`);
    return data;
};

export const get_categories_of_post = async (postId) => {
    const { data } = await $host.get(`api/posts/${postId}/categories`);
    return data;
};

export const get_comments_of_post = async (postId) => {
    const { data } = await $host.get(`api/posts/${postId}/comments`);
    return data;
};

export const post_post = async (title, content, categories, status) => {
    const { data } = await $host.post(`api/posts`, { title, content, categories, status });
    return data;
};

export const patch_post = async (postId, title, content, categories, status) => {
    const { data } = await $host.patch(`api/posts/${postId}`, { title, content, categories, status });
    return data;
};

export const delete_post = async (postId) => {
    const { data } = await $host.delete(`api/posts/${postId}`);
    return data;
};

export const get_likes = async (postId) => {
    const { data } = await $host.get(`api/posts/${postId}/like`);
    return data;
};

export const post_like = async (postId, type) => {
    const { data } = await $host.post(`api/posts/${postId}/like`, { type });
    return data;
};

export const delete_like = async (postId) => {
    const { data } = await $host.delete(`api/posts/${postId}/like`);
    return data;
};
