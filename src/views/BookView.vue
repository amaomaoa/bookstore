<script setup lang="ts">
import { getBookById } from "@/api/books";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Book } from "@/api/books";
import { imgPath } from "@/api";
import { addtocar, type Car } from "@/api/car";
import { ElMessage } from "element-plus";
import router from "@/router";


const route = useRoute();
const bookid = ref<number>(Number(route.params.id as string));
const book = ref<Book>(<Book>{});
const evaluation = ref<string>(""); //评论
const userRate = ref(null);

function getBookMsg() {
    getBookById(bookid.value).then((res) => {
        book.value = res.data.data as Book;
        document.title = book.value.name;
    });
}

function addToCaring() {
    addtocar(<Car>{ bookId: bookid.value }).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success("加入购物车成功");
        } else if(res.data.code == 401) {
            router.push("/login")
            ElMessage.error(res.data.msg);
        }
    });
}

function init() {
    getBookMsg();
}
init();
</script>

<template>
    <div class="main">
        <h2>{{ book.name }}</h2>
        <br />
        <div class="subject clearfix">
            <div class="mainpic">
                <img
                    v-if="book.cover"
                    :src="imgPath + book.cover"
                    style="width: 150px; height: 250px"
                />
            </div>
            <div class="info">
                <ul>
                    <li><span class="pl">作者: </span>{{ book.author }}</li>
                    <li>
                        <span class="pl">出版社: </span>{{ book.publisher }}
                    </li>
                    <li>
                        <span class="pl">出版时间: </span>{{ book.publishDate }}
                    </li>
                    <li><span class="pl">价格: </span>{{ book.price }}</li>
                    <li><span class="pl">库存: </span>{{ book.stock }}</li>
                    <li>
                        <div class="addcar" @click="addToCaring">
                            加入购物车
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="related_info">
            <h3 style="color: #007722">内容简介 · · · · · ·</h3>
            <p class="details" v-for="line in book.details?.split('\n')">
                {{ line }}
            </p>
        </div>
        <div class="evaluation">
            <h3 style="color: #007722">读者评价 · · · · · ·</h3>
            <div class="details">
                <el-input
                    v-model="evaluation"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea"
                    placeholder="请输入评价"
                />
                <div style="margin-top: 5px">
                    <el-rate v-model="userRate" style="display: inline" />
                    <el-button style="float: right">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    width: 1000px;
    margin: auto;
    margin-top: 100px;
}

.subject {
    position: relative;
    left: 20px;
    width: 500px;
}
.subject::after {
    content: "";
    display: block;
    clear: both;
}
.clearfix {
    display: block;
}

.mainpic {
    margin: 3px 0 0 0;
    float: left;
    text-align: center;
    margin: 3px 12px 0 0;
    max-width: 155px;
    overflow: hidden;
}
#info {
    max-width: 600px;
}

li {
    list-style: none;
    margin-bottom: 6px;
}
.pl {
    font: 16px Arial, Helvetica, sans-serif;
    line-height: 150%;
    color: #666666;
}

.info {
    float: left;
    max-width: 248px;
    word-wrap: break-word;
}

.related_info {
    margin-top: 50px;
    position: relative;
    left: 20px;
}

.details {
    position: relative;
    left: 20px;
}
.evaluation {
    position: relative;
    left: 20px;
    margin-top: 50px;
    margin-bottom: 100px;
}

.addcar {
    margin-top: 20px;
    text-align: center;
    cursor: pointer;
    width: 120px;
    border-radius: 15px;
    border: 10px;
    color: aliceblue;
    background-color: cadetblue;
}
</style>
