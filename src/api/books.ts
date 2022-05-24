import { get } from "./index";

export interface Page {
    countId: number | undefined;
    current: number;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: Array<Book>;
    pages: number;
    records: Array<any>;
    searchCount: boolean;
    size: number;
    total: number;
}

export interface Book {
    id: number;
    name: string;
    author: string;
    cover: string;
    introduction: string;
    details: string;
    publisher: string;
    publishDate: string | Date;
    tag: string;
    price: number;
    stock: number;
}

const prefix = "/storeApi/book/";

export const getbyTag = (tag: string) => {
    return get(prefix + "tag/" + tag);
};

export const getBookById = (id: number) => {
    return get(prefix + "id/" + id);
};

export const getRecommendBook = () => {
    return get(prefix + "get/recommendBook");
};

export const getNewBook = () => {
    return get(prefix + "get/newBook");
};

export const getPopularBook = () => {
    return get(prefix + "get/popularBook");
};

export const searchBook = (search: string) => {
    return get(prefix + "search/" + search);
};
