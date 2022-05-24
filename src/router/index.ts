import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component:()=>import("@/views/HomeView.vue"),
        },
        {
            path: "/tag/:tag",
            name: "tag",
            component:()=>import("@/views/TagView.vue"),
        },
        {
            path: "/book/:id",
            name: "book",
            component:()=>import("@/views/BookView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component:()=>import("@/views/LoginView.vue"),
        },
        {
            path: "/car",
            name: "car",
            component:()=>import("@/views/CarView.vue"),
        },
        {
            path: "/myorder",
            name: "myorder",
            component:()=>import("@/views/MyorderView.vue"),
        },
        {
            path: "/myhome",
            name: "myhome",
            component:()=>import("@/views/MyspaceView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component:()=>import("@/views/RegisterView.vue"),
        },
        {
            path: "/order/:id",
            name: "order",
            component:()=>import("@/views/OrderView.vue"),
        },
        {
            path: "/searhbook/:search",
            name: "searhbook",
            component:()=>import("@/views/SearhBookView.vue"),
        },
    ],
});

export default router;
