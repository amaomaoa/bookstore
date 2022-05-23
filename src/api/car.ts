import CarViewVue from "@/views/CarView.vue";
import { deletes, get, post, put } from ".";
import type { Book } from "./books";

const prefix = "/storeApi/cart/";

export interface Car {
    id: number;
    userId: number;
    bookId: number;
    quantity: number;
    price: number;
    bookInfo: Book;
    choose: boolean;
}

export const addtocar = (car: Car) => {
    return put(prefix + "add", car);
};

export const getCar = () => {
    return get(prefix + "get");
};

export const updateCar = (car: Car) => {
    return post(prefix + "update", car);
};

export const deleteCar = (id: number) => {
    return deletes(prefix + "delete/" + id);
};
