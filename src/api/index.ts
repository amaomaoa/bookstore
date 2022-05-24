import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";

export interface page {
    countId: number | undefined;
    current: number;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: Array<any>;
    pages: number;
    records: Array<any>;
    searchCount: boolean;
    size: number;
    total: number;
}

axios.interceptors.response.use(
    (success) => {
        return success;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    (config: any) => {
        let token = localStorage.getItem("token");
        if (token) {
            config.headers.satoken = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const swiperPath = "http://8.134.131.27:8001/swiper/get/";
export const imgPath = "http://8.134.131.27:8001/book/get/";
export const userPath = "http://8.134.131.27:8001/user/get/";
export const userUpload = "/picApi/user/upload";

export const get = async (path: string, params?: any) => {
    if (params) {
        return await axios.get(path, {
            params: params,
        });
    } else {
        return await axios.get(path);
    }
};
export const post = async (path: string, data?: any) => {
    return await axios.post(path, data);
};

export const put = async (path: string, data?: any) => {
    return await axios.put(path, data);
};

export const deletes = async (path: string) => {
    return await axios.delete(path);
};
