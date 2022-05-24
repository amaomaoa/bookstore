<script setup lang="ts">
import SwpierPic from "@/components/SwpierPic.vue";
import SwpierBook from "@/components/SwpierBook.vue";
import { computedAsync } from "@vueuse/core";
import {
    getPopularBook,
    getNewBook,
    getRecommendBook,
    type Book,
} from "@/api/books";

const recommendBook = computedAsync(async () => {
    return getRecommendBook().then((res) => {
        return res.data.data as Book[];
    });
}, []);

const newBook = computedAsync(async () => {
    return getNewBook().then((res) => {
        return res.data.data as Book[];
    });
}, []);

const popularBook = computedAsync(async () => {
    return getPopularBook().then((res) => {
        return res.data.data as Book[];
    });
}, []);

function init() {
    document.title = "bookstore";
}

init();
</script>

<template>
    <main>
        <SwpierPic />
        <SwpierBook msg="书籍推荐" :book="recommendBook" />
        <SwpierBook msg="新书上架" :book="newBook" />
        <SwpierBook msg="读者最爱" :book="popularBook" />
        <div class="placeholder"></div>
    </main>
</template>

<style scoped>
.placeholder{
    height: 200px;
}
</style>
