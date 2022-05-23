import { get } from "./index";
export interface Swiper {
    id: number;
    pictureUrl: string;
    display: boolean;
    url: string;
}

const prefix = "/storeApi/adverting/";

export const getdisplay = ():any => {
    return get(prefix + "getDisplay")
}