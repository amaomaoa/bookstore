<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { cancelById, getOrderById, payOrder, type Order } from "@/api/order";
import { imgPath } from "@/api";
import { ElMessage } from "element-plus";
const route = useRoute();
const orderId = ref(Number(route.params.id as string));

const orderMsg = ref<Order>(<Order>{})


async function getOrder() {
    const res = await getOrderById(orderId.value);
    orderMsg.value = res.data.data
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

function init(){
    document.title = "订单"
    getOrder()
}
init();
</script>

<template>
    <div class="main">
        <el-card shadow="never">
            <div class="head">
                <span>订单编号:{{ orderMsg.id }}</span>
                <span v-if="orderMsg.state == 0" class="state"> 未支付 </span>
                <span v-else-if="orderMsg.state == 1" class="state">
                    已完成
                </span>
                <span v-else="orderMsg.state == 2" class="state"> 已过期 </span>
            </div>
            <el-divider />
            <div class="info">
                <el-card
                    shadow="always"
                    v-for="(item, index) in orderMsg.singleOrders"
                    style="margin: 20px;"
                >
                    <el-image
                        :src="imgPath + item.bookMsg.cover"
                        style="width: 80px; height: 120px; margin-left: 40px"
                    />
                    <div class="center-vertically">
                        <span>书名: {{ item.bookMsg.name }}</span>
                    </div>
                    <div class="center-vertically">
                        <span>单价: {{ item.bookMsg.price }}</span>
                    </div>
                    <div class="center-vertically">
                        <span>数量: {{ item.quantity }}</span>
                    </div>
                    <div class="center-vertically">
                        <span>总价: {{ item.price }}</span>
                    </div>
                </el-card>
            </div>
            <div class="footer">
                <el-divider />
                <div class="operation">
                    <span style="margin-right: 20px"
                        >总价格:{{ orderMsg.total }}</span
                    >
                    <div
                        v-if="orderMsg.state == 0"
                        style="display: inline-block"
                    >
                        <el-button type="primary" @click="pay(orderMsg.id)"
                            >立即支付</el-button
                        >
                        <el-button type="warning" @click="cancel(orderMsg.id)"
                            >取消订单</el-button
                        >
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.main {
    width: 1200px;
    margin: auto;
    position: relative;
}

.state {
    float: right;
}

.info {
    width: 1000px;
    margin: auto;
}

.center-vertically {
    position: relative;
    display: inline-block;
    bottom: 50px;
    margin-left: 40px;
}

.operation {
    float: right;
    margin-bottom: 20px;
}
</style>
