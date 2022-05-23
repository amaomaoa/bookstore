import { defineStore } from "pinia";
import type { User } from "@/api/user";

export const useStore = defineStore("counterStore", {
    state: () => ({
        usermsg: <User | null>null,
    }),
    // 定义getters，类似于computed，具有缓存g功能
    getters: {},
    // 定义actions，类似于methods，用来修改state，做一些业务逻辑
    actions: {},
});
