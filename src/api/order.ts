import type { Car } from "./car";
import type { Address } from "./address";
import { deletes, get, post, put } from ".";
import type { Book } from "./books";

const prefix = "/storeApi/orders/";
export interface Order {
    id: number;
    userId: number;
    state: number;
    orderTime: Date;
    expiredTime: Date;
    total: number;
    singleOrders: SingleOrder[];
}
export interface SingleOrder {
    id: number;
    orderId: number;
    bookId: number;
    quantity: number;
    price: number;
    bookMsg: Book;
}

export interface CreateData {
    carts: Car[];
    address: Address;
}

export const createOrder = (createData: CreateData) => {
    return put(prefix + "create", createData);
};

export const getAllOrder = () => {
    return get(prefix + "get");
};

export const getOrderById = (id: number) => {
    return get(prefix + "get/" + id);
};

export const cancelById = (id: number) => {
    return deletes(prefix + "delete/" + id);
};

export const payOrder = (order: Order) => {
    return post(prefix + "pay", order);
};
