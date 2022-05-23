<script setup lang="ts">
import { getCar, updateCar, deleteCar } from "@/api/car";
import type { Car } from "@/api/car";
import { ref } from "vue";
import { imgPath } from "@/api";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import {
    getAddress,
    type Address,
    addAddress,
    deleteAddress,
} from "@/api/address";
import { createOrder } from "@/api/order";
import router from "@/router";

const cars = ref<Car[]>(<Car[]>[]);
const total = ref(0);
const changeAddressBox = ref(false);
const addressMsg = ref<Address[]>(<Address[]>{});
const changeAddress = ref<number | null>(null);
const addAddressbutton = ref(true);
const addAddressData = ref(<Address>{});
const ruleFormRef = ref<FormInstance>(<FormInstance>{});
const AddressRules = ref<FormRules>({
    consignee: [{ required: true, message: "收货人不能为空", trigger: "blur" }],
    phone: [{ required: true, message: "电话号码不能为空", trigger: "blur" }],
    province: [{ required: true, message: "省不能为空", trigger: "blur" }],
    city: [{ required: true, message: "市不能为空", trigger: "blur" }],
    area: [{ required: true, message: "区不能为空", trigger: "blur" }],
    other: [{ required: true, message: "详细不能为空", trigger: "blur" }],
});

function ischange() {
    return cars.value.filter((e) => e.choose).length > 0;
}

function getCaring() {
    getCar().then((res) => {
        cars.value = res.data.data as Car[];
        getTotal();
    });
}

function getTotal() {
    let count = 0;
    cars.value.forEach((car) => {
        if (car.choose) {
            count += car.price;
        }
    });
    total.value = count;
}

function chooseCar(value: boolean, id: number) {
    updateCar(<Car>{
        id: id,
        choose: value,
    });
    getTotal();
}

function changeQuantity(currentValue: number, id: number) {
    updateCar(<Car>{
        id: id,
        quantity: currentValue,
    })
        .then((res) => {
            if (res.data.code == 500) {
                ElMessage.error("商品库存不足");
            }
        })
        .finally(() => {
            getCaring();
        });
}

function deleteing(id: number) {
    deleteCar(id).finally(() => {
        getCaring();
    });
}

function getAddressing() {
    getAddress().then((res) => {
        addressMsg.value = res.data.data;
    });
}

function openAddress() {
    if (!ischange()) {
        ElMessage.error("你还没有选择商品");
        return;
    }
    getAddressing();
    changeAddressBox.value = true;
}

function createOrdering() {
    console.log(changeAddress.value);
    if (changeAddress.value == null) {
        ElMessage.error("请选择地址");
    } else {
        let changingcat = cars.value.filter((c) => c.choose);
        let id = 0;
        createOrder({
            carts: changingcat,
            address: <Address>{
                id: changeAddress.value,
            },
        }).then((res) => {
            router.push("/order/" + res.data.data.id);
        });
    }
}

function addAddressing() {
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            addAddress(addAddressData.value)
                .then((res) => {
                    if (res.data.code == 200) {
                        ElMessage.success("添加成功");
                    } else {
                        ElMessage.error(res.data.msg);
                    }
                })
                .finally(() => {
                    getAddressing();
                    addAddressbutton.value = true;
                });
        }
    });
}

function canceladd() {
    ruleFormRef.value.resetFields();
    addAddressData.value = <Address>{};
    addAddressbutton.value = true;
}

function deleteAddressing(id: number) {
    deleteAddress(id)
        .then((res) => {
            if (res.data.code == 200) {
                ElMessage.success("删除成功");
            } else {
                ElMessage.error(res.data.msg);
            }
        })
        .catch(() => {
            ElMessage.error("不允许删除该地址");
        })
        .finally(() => {
            getAddressing();
        });
}

function init() {
    document.title = "我的购物车";
    getCaring();
}
init();
</script>
<template>
    <h2 class="title">我的购物车</h2>
    <div v-if="cars.length == 0">
        <h2 style="text-align: center">购物车空空如也</h2>
    </div>
    <div class="main">
        <div
            v-for="(item, index) in cars"
            :key="index"
            style="position: relative"
        >
            <el-card class="box-card">
                <el-checkbox
                    v-model="item.choose"
                    class="center-vertically"
                    size="large"
                    @change="chooseCar($event, item.id)"
                />
                <el-image
                    :src="imgPath + item.bookInfo.cover"
                    style="width: 80px; height: 120px; margin-left: 100px"
                />
                <div class="center-vertically fixed">
                    <span>{{ item.bookInfo.name }}</span>
                </div>
                <span class="center-vertically fixed"
                    >￥{{ item.bookInfo.price }}</span
                >
                <span class="center-vertically" style="margin: 0">
                    <el-input-number
                        v-model="item.quantity"
                        :min="1"
                        @change="changeQuantity($event, item.id)"
                    />
                </span>
                <span class="center-vertically fixed">￥{{ item.price }}</span>
                <span
                    class="center-vertically deletes"
                    @click="deleteing(item.id)"
                    >删除</span
                >
            </el-card>
        </div>
        <div class="footer">
            <el-card class="box-card" shadow="never">
                <div class="total">
                    <span>合计: {{ total }}</span>
                    <div class="settlement" @click="openAddress">
                        <span>结算</span>
                    </div>
                </div>
            </el-card>
        </div>
        <el-dialog
            v-model="changeAddressBox"
            title="请选择地址"
            width="800px"
            style="position: relative"
        >
            <el-radio-group v-model="changeAddress">
                <el-radio v-for="(item, index) in addressMsg" :label="item.id">
                    收件人: <span>{{ item.consignee }}</span> 联系电话:
                    <span>{{ item.phone }}</span> 收获地址:
                    <span>{{ item.province }}</span>
                    <span>{{ item.city }}</span>
                    <span>{{ item.area }}</span>
                    <span>{{ item.other }}</span>
                    <el-button style="margin-left: 5px;"
                        @click="deleteAddressing(item.id)"
                        size="small"
                        type="warning"
                        >删除</el-button
                    >
                </el-radio>
            </el-radio-group>
            <div>
                <el-button
                    v-if="addAddressbutton"
                    style="addButton"
                    type="primary"
                    @click="addAddressbutton = false"
                    >添加地址</el-button
                >
                <div v-else>
                    <el-form
                        :inline="true"
                        :model="addAddressData"
                        :rules="AddressRules"
                        ref="ruleFormRef"
                    >
                        <el-row :gutter="0">
                            <el-col :span="5">
                                <el-form-item label="收货人" prop="consignee">
                                    <el-input
                                        v-model="addAddressData.consignee"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="联系电话" prop="phone">
                                    <el-input v-model="addAddressData.phone" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="省" prop="province">
                                    <el-input
                                        v-model="addAddressData.province"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="市" prop="city">
                                    <el-input v-model="addAddressData.city" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="区" prop="area">
                                    <el-input v-model="addAddressData.area" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="详细地址" prop="other">
                                    <el-input v-model="addAddressData.other" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-button
                                        type="primary"
                                        @click="addAddressing"
                                        >添加</el-button
                                    >
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="canceladd"
                                        >取消</el-button
                                    >
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="createOrdering"
                        >确定</el-button
                    >

                    <el-button @click="changeAddressBox = false"
                        >取消</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped>
.title {
    width: 1300px;
    margin: auto;
}
.main {
    width: 1200px;
    margin: auto;
    margin-top: 30px;
}
::v-deep(.el-checkbox__inner) {
    border-color: #000000;
}

.center-vertically {
    position: relative;
    bottom: 50px;
    margin-left: 80px;
}
.box-card {
    margin-bottom: 20px;
}
.footer {
    position: fixed;
    width: 1200px;
    height: 100px;
    border: 2px #000000;
    border-color: #000000;
    bottom: 0px;
}
.total {
    position: relative;
    left: 900px;
    font-size: 22px;
}

.fixed {
    display: inline-block;
    width: 100px;
}
.settlement {
    margin-left: 20px;
    display: inline-block;
    text-align: center;
    width: 80px;
    color: #fff;
    background-color: #ff5000;
    border-radius: 30px;
    cursor: pointer;
}

.deletes:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
