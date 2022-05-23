<script setup lang="ts">
import { get } from "@/api";
import { getBookById } from "@/api/books";
import { getAllOrder, payOrder, cancelById, type Order } from "@/api/order";
import { computedAsync } from "@vueuse/core";
import { computed, ref } from "vue";
import { imgPath } from "@/api";

import { ElMessage } from "element-plus";

const allOrder = ref<Order[]>(<Order[]>[]);

function getOrder() {
    getAllOrder().then((res) => {
        allOrder.value = res.data.data;
    });
}

function pay(id: number) {
    payOrder(<Order>{ id: id })
        .then((res) => {
            if (res.data.code == 200) {
                ElMessage.success("支付成功");
            } else {
                ElMessage.error(res.data.msg);
            }
        })
        .finally(() => {
            getOrder();
        });
}

function cancel(id: number) {
    cancelById(id)
        .then((res) => {
            if (res.data.code == 200) {
                ElMessage.success("取消订单成功");
            } else {
                ElMessage.error(res.data.msg);
            }
        })
        .finally(() => {
            getOrder();
        });
}

function init() {
    document.title = "我的订单"
    getOrder();
}

init();
</script>
<template>
    <h2 class="title">我的订单</h2>

    <div v-if="allOrder.length == 0">
        <h2 style="text-align: center">你还没有下过订单哦</h2>
    </div>
    <div class="main">
        <el-card v-for="(item, index) in allOrder" :key="index" class="order">
            <routerLink :to="'/order/' + item.id">
                <div class="head">
                    <span class="orderid"> 订单编号: {{ item.id }} </span>
                    <span v-if="item.state == 0" class="state"> 未支付 </span>
                    <span v-else-if="item.state == 1" class="state">
                        已完成
                    </span>
                    <span v-else="item.state == 2" class="state"> 已过期 </span>
                </div>
                <el-divider />
                <div class="info">
                    <div v-for="book in item.singleOrders" class="img">
                        <routerLink :to="'/book/' + book.bookId">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                placement="top"
                            >
                                <template #content>
                                    书名: {{ book.bookMsg.name }}<br />数量:
                                    {{ book.quantity }}<br />单价:
                                    {{ book.bookMsg.price }} <br />
                                    合计:{{ book.price }}
                                </template>

                                <el-image
                                    style="width: 80; height: 120px"
                                    :src="imgPath + book.bookMsg.cover"
                                />
                            </el-tooltip>
                        </routerLink>
                    </div>
                </div>
            </routerLink>
            <div class="footer">
                <el-divider />
                <div class="operation">
                    <span style="margin-right: 20px"
                        >总价格:{{ item.total }}</span
                    >
                    <div v-if="item.state == 0" style="display: inline-block">
                        <el-button type="primary" @click="pay(item.id)"
                            >立即支付</el-button
                        >
                        <el-button type="warning" @click="cancel(item.id)"
                            >取消订单</el-button
                        >
                    </div>
                </div>
            </div>
        </el-card>
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
    position: relative;
}
.order {
    margin: 20px;
}

.state {
    float: right;
}

.info {
    width: 1000px;
    margin: auto;
}

.img {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
}
.operation {
    float: right;
    margin-bottom: 20px;
}

a {
    color: #000000;
}
</style>
