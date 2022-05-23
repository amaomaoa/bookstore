<script setup lang="ts">
import { getAnnouncement } from "@/api/announcement";
import type { Announcement } from "@/api/announcement";
import { ref } from "vue";

const carousel = ref<HTMLFormElement>(<HTMLFormElement>{});
const announcements = ref<Announcement[]>(<Announcement[]>[]);

function getAnnouncements() {
    getAnnouncement()
        .then((res) => {
            announcements.value = res.data.data;
        })
        .finally(() => {
            carousel.value.setActiveItem(0);
        });
}

function init() {
    getAnnouncements();
}
init();
</script>

<template>
    <div class="main">
        <el-carousel
            indicator-position="none"
            arrow="always"
            height="40px"
            ref="carousel"
        >
            <el-carousel-item
                v-for="(item, index) in announcements"
                :key="index"
            >
                <span class="info">{{ item.info }}</span>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
.main {
    width: 100%;
    background-color: #3e5962;
}
.el-carousel {
    width: 600px;
    margin: auto;
}
.el-carousel__item {
    text-align: center;
}

.info {
    font-family: Lato !important;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.8;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    text-transform: uppercase;
    text-decoration: none;
    margin-top: 3px;
}

::v-deep(.el-carousel__arrow){
  color: #000000;
  background-color: #3e5962;
}
</style>
