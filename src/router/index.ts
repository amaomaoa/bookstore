import { checkLogin } from "@/api/user";
import { ElMessage } from "element-plus";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/tag/:tag",
            name: "tag",
            component: () => import("@/views/TagView.vue"),
        },
        {
            path: "/book/:id",
            name: "book",
            component: () => import("@/views/BookView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/car",
            name: "car",
            component: () => import("@/views/CarView.vue"),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: "/myorder",
            name: "myorder",
            component: () => import("@/views/MyorderView.vue"),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: "/myhome",
            name: "myhome",
            component: () => import("@/views/MyspaceView.vue"),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/RegisterView.vue"),
        },
        {
            path: "/order/:id",
            name: "order",
            component: () => import("@/views/OrderView.vue"),
            meta: {
                requireAuth: true,
            },
        },
        {
            path: "/searhbook/:search",
            name: "searhbook",
            component: () => import("@/views/SearhBookView.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        // 判断该路由是否需要登录权限
        checkLogin().then((res) => {
            if (res) {
                next();
            } else {
                ElMessage.error("用户未登录")
                next({
                    path: "/login",
                    query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            }
        });
    } else {
        next();
    }
});

export default router;
