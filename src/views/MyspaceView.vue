<script setup lang="ts">
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { userPath } from "@/api";
import { EditPen, Check } from "@element-plus/icons-vue";
const store = useStore();
const userForm = ref(store.$state.usermsg);
const bakForm = ref(store.$state.usermsg);
const changeName = ref(false);
const changeMail = ref(false);
</script>

<template>
    <div class="main">
        <el-form label-width="120px">
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <el-avatar fill="fill" :src="userPath + userForm?.avatar" />
                </el-upload>
            </el-form-item>
            <el-form-item lable="用户名">
                <el-input
                    v-model="userForm?.name"
                    :disabled="changeName"
                    placeholder="Please input"
                >
                    <template #append>
                        <el-button :icon="EditPen" v-if="!changeMail" />
                        <el-button :icon="Check" v-else />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item lable="邮箱">
                <el-input
                    v-model="userForm?.mail"
                    :disabled="changeMail"
                    placeholder="Please input"
                >
                    <template #append>
                        <el-button :icon="EditPen" v-if="!changeMail" />
                        <el-button :icon="Check" v-else />
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
