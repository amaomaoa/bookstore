import router from "@/router";
import { ElNotification, ElMessage, type FormRules } from "element-plus";

import { ref } from "vue";
import { get, post, put } from ".";

export interface User {
    id?: number;
    name: string;
    password: string;
    mail?: string;
    avatar: string;
    permissions?: boolean;
}
export const userRules = ref<FormRules>({
    name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

const prefix = "/storeApi/user/";
const loginpath = prefix + "login";
const checkloginpath = prefix + "checkLogin";
const logoutpath = prefix + "logout";
const registeredpath = prefix + "registered";
const getUserMsgpath = prefix + "getUserMsg";

export const login = (user: User) => {
    post(loginpath, user).then((res) => {
        if (res.data.code == 200) {
            ElNotification({
                title: "欢迎回来",
                message: res.data.msg,
                type: "success",
            });
            localStorage.setItem("token", res.data.data.token);
            router.push({ name: "home", params: { refresh: 1 } });
        } else {
            ElNotification({
                title: "Error",
                message: res.data.msg,
                type: "error",
            });
        }
    });
};

export const logout = async () => {
    const res = await post(logoutpath);
    let data = res.data;
    if (data.code == 200) {
        localStorage.removeItem("token");
    }
};

export const checkLogin = async () => {
    const res = await get(checkloginpath);
    return res.data.data;
};

export const registered = (user: User) => {
    put(registeredpath, user).then((res) => {
        console.log(res.data.code);
        if (res.data.code == 200) {
            ElNotification({
                title: "注册成功",
                message: res.data.msg,
                type: "success",
            });
            post(loginpath, user).then((res2) => {
                if (res2.data.code == 200) {
                    localStorage.setItem("token", res2.data.data.token);
                    router.push({ name: "home", params: { refresh: 1 } });
                }
            });
        } else {
            ElNotification({
                title: "注册失败",
                message: res.data.msg,
                type: "error",
            });
        }
    });
};

export const updateUser = (user: User) => {
    return post(prefix + "updateUser", user);
};

export const getUserMsg = async () => {
    const res = await get(getUserMsgpath);
    return res.data.data;
};
