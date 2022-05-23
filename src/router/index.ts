import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TagView from "@/views/TagView.vue";
import BookView from "@/views/BookView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CarView from "@/views/CarView.vue";
import MyorderView from "@/views/Myorder.vue";
import MyspaceViewVue from "@/views/MyspaceView.vue";
import OrderView from "@/views/OrderView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/tag/:tag",
            name: "tag",
            component: TagView,
        },
        {
            path: "/book/:id",
            name: "book",
            component: BookView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/car",
            name: "car",
            component: CarView,
        },
        {
            path: "/myorder",
            name: "myorder",
            component: MyorderView,
        },
        {
            path: "/myhome",
            name: "myhome",
            component: MyspaceViewVue,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/order/:id",
            name: "order",
            component: OrderView,
        },
    ],
});

export default router;
