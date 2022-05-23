<script setup lang="ts">
import { getCar, updateCar, deleteCar } from "@/api/car";
import type { Car } from "@/api/car";
import { ref } from "vue";
import { imgPath } from "@/api";
import { ElMessage } from "element-plus";
import { getAddress, type Address } from "@/api/address";
import { createOrder } from "@/api/order";
import router from "@/router";

const cars = ref<Car[]>(<Car[]>[]);
const total = ref(0);
const changeAddressBox = ref(false);
const addressMsg = ref<Address[]>(<Address[]>{});
const changeAddress = ref<number | null>(null);

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

function init() {
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
        <el-dialog v-model="changeAddressBox" title="请选择地址" width="30%">
            <el-radio-group v-model="changeAddress">
                <el-radio v-for="(item, index) in addressMsg" :label="item.id">
                    收件人: <span>{{ item.consignee }}</span> 联系电话:
                    <span>{{ item.phone }}</span> 收获地址:
                    <span>{{ item.province }}</span>
                    <span>{{ item.city }}</span>
                    <span>{{ item.area }}</span>
                    <span>{{ item.other }}</span>
                </el-radio>
            </el-radio-group>
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
