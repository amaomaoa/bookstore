<script setup lang="ts">
import { ref } from "vue";
import { checkLogin, login, type User } from "@/api/user";
import { userRules } from "@/api/user";
import type { FormInstance } from "element-plus";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const loginData = ref(<User>{
    name: "",
    password: "",
});
const prefix = "/storeApi/user/";
const ruleFormRef = ref<FormInstance>(<FormInstance>{});

const loginning = () => {
    const redirect = route.query.redirect;
    console.log(redirect);
    ruleFormRef.value.validate((valid) => {
        login(loginData.value, redirect as string);
    });
};

function init() {
    checkLogin().then((res) => {
        if (res) {
            router.push("/");
        }
    });
    document.title = "登录";
}
init();
</script>
<template>
    <el-form
        class="loginContainer"
        :model="loginData"
        :rules="userRules"
        ref="ruleFormRef"
    >
        <h3 class="loginTitle">用户登录</h3>
        <el-form-item prop="name">
            <el-input
                type="text"
                v-model="loginData.name"
                placeholder="请输入用户名"
            />
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                type="password"
                v-model="loginData.password"
                placeholder="请输入密码"
                prop="password"
            />
        </el-form-item>
        <el-button @click="loginning" size="large" type="primary"
            >登录</el-button
        >
        <routerLink to="/register"
            ><span class="register"> 没有帐号,去注册</span></routerLink
        >
    </el-form>
</template>
<style scoped>
.loginContainer {
    text-align: center;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;
}

.loginTitle {
    margin: 0px auto 40px auto;
    text-align: center;
}

.register {
    position: absolute;
    font-size: 13px;
    right: 20px;
    bottom: 20px;
}
</style>
