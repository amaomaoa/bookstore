<script setup lang="ts">
import { ref } from "vue";
import { registered, type User, userRules } from "@/api/user";
import type { FormInstance } from "element-plus";

const registerData = ref(<User>{
    name: "",
    password: "",
});
const prefix = "/storeApi/user/";
const ruleFormRef = ref<FormInstance>(<FormInstance>{});
const register = () => {
    ruleFormRef.value.validate((valid) => {
        registered(registerData.value);
    });
};

function init() {
    document.title = "注册";
}
init();
</script>
<template>
    <el-form
        class="registerContainer"
        :model="registerData"
        :rules="userRules"
        ref="ruleFormRef"
    >
        <h3 class="registerTitle">用户注册</h3>
        <el-form-item>
            <el-input
                type="text"
                v-model="registerData.name"
                placeholder="请输入用户名"
            />
        </el-form-item>
        <el-form-item>
            <el-input
                type="password"
                v-model="registerData.password"
                placeholder="请输入密码"
            />
        </el-form-item>
        <el-button @click="register" size="large" type="primary"
            >注册</el-button
        >
        <routerLink to="/login"
            ><span class="login"> 已有帐号,去登录</span></routerLink
        >
    </el-form>
</template>
<style scoped>
.registerContainer {
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

.registerTitle {
    margin: 0px auto 40px auto;
    text-align: center;
}

.login {
    position: absolute;
    font-size: 13px;
    right: 20px;
    bottom: 20px;
}
</style>
