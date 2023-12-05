import { $host } from "./index";

export const get_likes = async (commentId) => {
    const { data } = await $host.get(`api/comments/${commentId}/like`);
    return data;
};

export const post_like = async (commentId, type) => {
    const { data } = await $host.post(`api/comments/${commentId}/like`, { type });
    return data;
};

export const delete_like = async (commentId) => {
    const { data } = await $host.delete(`api/comments/${commentId}/like`);
    return data;
};

export const post_comment = async (postId, content) => {
    const { data } = await $host.post(`api/posts/${postId}/comments`, { content });
    return data;
};

export const patch_comment = async (commentId, content) => {
    const { data } = await $host.patch(`api/comments/${commentId}`, { content });
    return data;
};

export const delete_comment = async (commentId) => {
    const { data } = await $host.delete(`api/comments/${commentId}`);
    return data;
};
