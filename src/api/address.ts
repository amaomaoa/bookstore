import { deletes, get, post, put } from ".";

const prefix = "/storeApi/address/";

export interface Address {
    id: number;
    consignee: string;
    userId: number;
    phone: number;
    province: string;
    city: string;
    area: string;
    other: string;
}

export const getAddress = () => {
    return get(prefix + "get");
};

export const addAddress = (address: Address) => {
    return put(prefix + "add", address);
};

export const updateAddress = (address: Address) => {
    return post(prefix + "update", address);
};

export const deleteAddress = (id: number) => {
    return deletes(prefix + "delete/" + id);
};
