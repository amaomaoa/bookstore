<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
import { userPath } from "@/api";
import {
    EditPen,
    CircleCloseFilled,
    CircleCheckFilled,
} from "@element-plus/icons-vue";
import type { User } from "@/api/user";
const store = useStore();
const userForm = ref<User>(<User>store.$state.usermsg);
const bakForm = ref<User>(<User>store.$state.usermsg);
const changeName = ref(true);
const changeMail = ref(true);
</script>

<template>
    <div class="main">
        <el-form label-width="200px">
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" :show-file-list="false">
                    <el-avatar
                        style="width: 100px; height: 100px"
                        fill="fill"
                        :src="userPath + userForm?.avatar"
                    />
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input
                    size="large"
                    v-model="userForm.name"
                    :disabled="!changeName"
                >
                    <template #append>
                        <el-button v-if="!changeName" :icon="EditPen" />
                        <div v-else>
                            <el-button :icon="CircleCheckFilled" />
                            <el-button :icon="CircleCloseFilled" />
                        </div>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input
                    size="large"
                    v-model="userForm.mail"
                    :disabled="!changeMail"
                >
                    <template #append>
                        <el-button v-if="!changeMail" :icon="EditPen" />
                        <div v-else>
                            <el-button :icon="CircleCheckFilled" />
                            <el-button :icon="CircleCloseFilled" />
                        </div>
                        ></template
                    >
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.main {
    width: 1000px;
    margin: auto;
}
</style>
