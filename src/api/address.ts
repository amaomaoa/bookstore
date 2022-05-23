import { deletes, get, post, put } from ".";

const prefix = "/storeApi/address/";

export interface Address {
    id: number;
    consignee: string;
    userId: number;
    phone: number;
    province: number;
    city: number;
    area: number;
    other: number;
}

export const getAddress = () => {
    return get(prefix + "get");
};

export const addAddress = () => {
    return put(prefix + "add");
};

export const updateAddress = () => {
    return post(prefix + "update");
};

export const deleteAddress = () => {
    return deletes(prefix + "update");
};
