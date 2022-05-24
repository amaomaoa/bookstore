<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref, watch } from "vue";
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
import { checkLogin, logout } from "@/api/user";
import { userPath } from "@/api";
import { useRoute } from "vue-router";
import router from "@/router";
import { ElNotification } from "element-plus";
const route = useRoute();
const searchStr = ref<string>("");
const select = ref<string>("Book");
const store = useStore();
const { usermsg } = storeToRefs(store);

function setusermsg() {
    checkLogin().then((res) => {
        store.usermsg = res;
    });
}

function logouting() {
    logout().finally(() => {
        setusermsg();
        router.push({ name: "home", params: { refresh: 1 } });

        ElNotification({
            title: "再见",
            message: "欢迎再来",
            type: "success",
        });
    });
}

function searching(){
    console.log(searchStr.value);
    
}

function init() {
    setusermsg();
}


watch(route, (newRoute) => {
    if (newRoute.params.refresh) {
        setusermsg();
    }
});

init();
</script>
<template>
    <div class="main">
        <div class="logo">
            <span>B</span>
            <span>O</span>
            <span>O</span>
            <span>K</span>
            <span style="color: #c0a02e">&</span>
            <span>S</span>
            <span>T</span>
            <span>O</span>
            <span>R</span>
            <span>E</span>
        </div>
        <div class="Search">
            <el-input
                class="w-30 m-2"
                v-model="searchStr"
                placeholder="Please input"
                size="large"
            >
                <template #prepend>
                    <el-select
                        v-model="select"
                        placeholder="Select"
                        style="width: 90px; background-color: #dddddd"
                        size="large"
                        :select-when-unmatched="true"
                        @select="searching"
                    >
                        <el-option label="Book" value="1" />
                        <el-option label="Tag" value="2" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <div class="user">
            <el-dropdown v-if="usermsg">
                <el-avatar
                    :src="userPath + usermsg.avatar"
                    style="cursor: pointer"
                />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <routerLink to="/myhome">个人信息</routerLink>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <routerLink to="/car">购物车</routerLink>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <routerLink to="/myorder">我的订单</routerLink>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <span style="cursor: pointer" @click="logouting">
                                <a href="#"> 退出登录 </a>
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown v-else>
                <routerLink to="/login">
                    <el-avatar :src="userPath + 'nologin.png'" />
                </routerLink>
            </el-dropdown>
        </div>
    </div>
</template>
<style scoped>
.main {
    width: 1100px;
    margin: 30px auto 30px auto;
    text-align: center;
}
.logo {
    font-size: 25px;
    cursor: pointer;
    display: inline;
}

.user {
    margin-left: 100px;
    display: inline;
    position: relative;
}

.logo span {
    margin-left: 5px;
}

.Search {
    margin-left: 100px;
    display: inline;
}
.el-input-group {
    width: 600px;
}
a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    text-decoration: none;
    color: black;
}
</style>
