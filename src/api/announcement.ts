import { get } from "./index";

const prefix = "/storeApi/announcement/";

export interface Announcement {
    id: number;
    info: string;
    display: boolean;
}

export const getAnnouncement = () => {
    return get(prefix+"getDisplay")
};
