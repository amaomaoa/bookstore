<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
import { userPath, userUpload } from "@/api";
import { Edit, Check, Close } from "@element-plus/icons-vue";
import { type User, updateUser, getUserMsg } from "@/api/user";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";

const store = useStore();
const { usermsg } = storeToRefs(store);
const userForm = ref<User>(<User>store.$state.usermsg);
const changeName = ref(false);
const changeMail = ref(false);
function avatarUpload(response: any) {
    let avatar = response.msg;
    updateUser(<User>{
        id: usermsg.value?.id,
        avatar: avatar,
    }).finally(async () => {
        getUserMsg().then((res) => {
            usermsg.value = res;
            userForm.value = res;
        });
    });
}
function avatarUploadErr() {
    ElMessage.error("不支持的文件类型");
}

function updateUsering() {
    updateUser(<User>{
        id: userForm.value.id,
        name: userForm.value.name,
        mail: userForm.value.mail,
    })
        .then((res) => {
            if (res.data.code == 500) {
                ElMessage.error(res.data.msg);
            }
        })
        .catch(() => {
            ElMessage.error("用户名被占用");
        })
        .finally(() => {
            getUserMsg().then((res) => {
                usermsg.value = res;
                userForm.value = res;
            });
        });
    changeName.value = false;
    changeMail.value = false;
}

function cancelUpdate() {
    getUserMsg().then((res) => {
        usermsg.value = res;
        userForm.value = res;
    });
    changeName.value = false;
    changeMail.value = false;
}
</script>

<template>
    <div class="main">
        <div v-if="userForm == null">用户未登录</div>
        <el-form label-width="200px">
            <el-form-item label="头像" label-position="left">
                <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :action="userUpload"
                    :on-success="avatarUpload"
                    :on-error="avatarUploadErr"
                    name="pic"
                >
                    <el-avatar
                        style="width: 100px; height: 100px"
                        fill="fill"
                        :src="userPath + userForm.avatar"
                    />
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input
                    size="large"
                    v-model="userForm.name"
                    :show-file-list="false"
                    :disabled="!changeName"
                >
                </el-input>
                <div class="buttons">
                    <el-button
                        v-if="!changeName"
                        type="primary"
                        :icon="Edit"
                        circle
                        @click="changeName = true"
                    />
                    <div v-else>
                        <el-button
                            type="success"
                            :icon="Check"
                            @click="updateUsering"
                            circle
                        />
                        <el-button
                            type="danger"
                            :icon="Close"
                            @click="cancelUpdate"
                            circle
                        />
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input
                    size="large"
                    v-model="userForm.mail"
                    :disabled="!changeMail"
                >
                </el-input>

                <div class="buttons">
                    <el-button
                        v-if="!changeMail"
                        type="primary"
                        :icon="Edit"
                        circle
                        @click="changeMail = true"
                    />
                    <div v-else>
                        <el-button
                            type="success"
                            :icon="Check"
                            @click="updateUsering"
                            circle
                        />
                        <el-button
                            type="danger"
                            :icon="Close"
                            @click="cancelUpdate"
                            circle
                        />
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.main {
    width: 1000px;
    margin: auto;
    margin-top: 100px;
}
.el-input {
    width: 70%;
}
.buttons {
    margin-left: 20px;
}
</style>
