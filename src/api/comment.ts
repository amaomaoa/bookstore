import { put, deletes, get, post } from ".";

const prefix = "/storeApi/comment/";

export interface Comment {
    id: number;
    userId: number;
    userName: string;
    bookId: number;
    score: number;
    info: number;
}

export const getCommentByBookId = (id: number) => {
    return get(prefix + "getByBookId/" + id);
};

export const addComment = (comment: Comment) => {
    return put(prefix + "add", comment);
};

export const deleteComment = (id: number) => {
    return deletes(prefix + "detect/" + id);
};
