<script setup lang="ts">
import { getdisplay } from "@/api/swpier";
import type { Swiper } from "@/api/swpier";
import { ref } from "vue";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { swiperPath } from "@/api/index";

const carousel = ref<HTMLFormElement>(<HTMLFormElement>{});
const swipers = ref<Swiper[]>(<Swiper[]>{});

function getSwipers() {
    getdisplay()
        .then((res:any) => {
            swipers.value = res.data.data;
        })
        .finally(() => {
            carousel.value.setActiveItem(0);
        });
}

function init() {
    getSwipers();
}
init();
</script>

<template>
    <div class="main">
        <el-carousel
            indicator-position="outside"
            arrow="always"
            height="400px"
            ref="carousel"
        >
            <el-carousel-item
                v-for="(item , index) in swipers"
                :key="index"
                fit="scale-down"
            >
                <a :href="item.url">
                    <el-image :src="swiperPath + item.pictureUrl">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
.main {
    width: 1200px;
    margin: auto;
}

</style>
