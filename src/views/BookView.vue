<script setup lang="ts">
import { getBookById } from "@/api/books";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { Book } from "@/api/books";
import { imgPath } from "@/api";
import { addtocar, type Car } from "@/api/car";
import { ElMessage } from "element-plus";
import router from "@/router";
import {
    getCommentByBookId,
    addComment,
    deleteComment,
    type Comment,
} from "@/api/comment";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const store = useStore();
const { usermsg } = storeToRefs(store);

const route = useRoute();
const bookid = ref<number>(Number(route.params.id as string));
const book = ref<Book>(<Book>{});
const comments = ref<Comment[]>(<Comment[]>[]);
const evaluation = ref<string>(""); //评论
const userRate = ref(null);

const score = computed(() => {
    let res = 0;
    comments.value.forEach((e) => {
        res += e.score;
    });
    if (comments.value.length == 0) {
        return (0).toFixed(1);
    }
    return (res / comments.value.length).toFixed(1);
});

function getBookMsg() {
    getBookById(bookid.value).then((res) => {
        book.value = res.data.data as Book;
        document.title = book.value.name;
    });
}

function getComent() {
    getCommentByBookId(bookid.value).then((res) => {
        comments.value = res.data.data;
    });
}

function addToCaring() {
    addtocar(<Car>{ bookId: bookid.value }).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success("加入购物车成功");
        } else if (res.data.code == 401) {
            router.push("/login");
            ElMessage.error(res.data.msg);
        }
    });
}

function commenting() {
    if (!evaluation.value) {
        return;
    } else if (!userRate.value) {
        ElMessage.error("请选择评分");
    }
    let posts = {
        bookId: bookid.value,
        info: evaluation.value,
        score: userRate.value,
    };
    addComment(posts as unknown as Comment)
        .then()
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            getComent();
        });
}

function deleteCommenting(id: number) {
    deleteComment(id).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success("删除成功");
            getComent();
        } else {
            ElMessage.error(res.data.msg);
        }
    });
}

function init() {
    getBookMsg();
    getComent();
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

            <div class="interest_sectl">
                <div style="height: 200px; display: inline-block">
                    <p style="color: #9b9b9b9b">读者评分</p>
                    <span class="ll rating_num">{{ score }}</span>
                    <div style="display: inline-block">
                        <el-rate disabled v-model="score" />
                        <span
                            style="
                                display: block;
                                color: #9b9b9b9b;
                                font-size: 13px;
                            "
                            >{{ comments.length }}个评论</span
                        >
                    </div>
                </div>
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
                    <el-button style="float: right" @click="commenting"
                        >确定</el-button
                    >
                </div>
            </div>
            <div>
                <div class="scope" v-for="(item, index) in comments">
                    <el-card shadow="never">
                        <span style="color: black">{{ item.userName }}:</span>
                        <span style="color: #3f634c; margin-left: 10px">{{
                            item.info
                        }}</span>
                        <span
                            class="deleteComments"
                            @click="deleteCommenting(item.id)"
                            v-if="item.userId == usermsg?.id"
                            >删除</span
                        >
                    </el-card>
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
    width: 900px;
    position: relative;
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
.interest_sectl {
    position: absolute;
    width: 155px;
    right: 0px;
    margin: 2px 0 0 0;
    padding: 0 0 0 15px;
    border-left: 1px solid #eaeaea;
    color: black;
}
.el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 200px;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
}

.rating_num {
    font-size: 40px;
    position: relative;
    bottom: 10px;
    margin-right: 10px;
}
.scope {
    margin: auto;
    margin-top: 30px;
    position: relative;
    left: 20px;
}
.deleteComments {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(147, 139, 129);
    font-size: 16px;
    float: right;
}
</style>
