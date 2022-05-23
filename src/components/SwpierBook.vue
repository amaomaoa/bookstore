<script setup lang="ts">
import type { Book } from "@/api/books";
import { ref, computed } from "vue";
import { imgPath } from "@/api/index";
const props = defineProps<{
  book: Book[];
  msg: string;
}>();

const bookPath = "/book/";
const carousel = ref<HTMLFormElement>(<HTMLFormElement>{});

const TwoDimensional = computed(() => {
  let book = props.book;
  let arr: Book[][] = new Array();
  for (let i = 0; i < book.length; i++) {
    let a = Math.floor(i / 6),
      b = Math.floor(i % 6);
    if (arr[a] == undefined) {
      arr[a] = new Array();
    }
    arr[a][b] = book[i];
  }

  setTimeout(() => {
    carousel.value.setActiveItem(0);
  }, 10);
  return arr;
});
</script>

<template>
  <div class="main">
    <div class="title">
      <span v-for="i in msg.split('')">{{ i }}</span>
    </div>
    <el-carousel
      indicator-position="none"
      arrow="always"
      ref="carousel"
      :autoplay="false"
      height="200px"
    >
      <el-carousel-item v-for="(item, index) in TwoDimensional" :key="index">
        <ul>
          <li v-for="(i, j) in item">
            <routerLink :to="bookPath + i.id">
              <el-tooltip
                class="box-item"
                effect="light"
                :content="i.name"
                placement="top"
              >
                <el-image
                  style="width: 100px; height: 160px"
                  :src="imgPath + i.cover"
                />
              </el-tooltip>
            </routerLink>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
li {
  list-style: none;
  display: inline;
  margin: auto 30px auto 30px;
}

.main {
  text-align: center;
  width: 1200px;
  margin: auto;
}

.title {
  position: relative;
  left: -500px;
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.title span {
  margin: 2px;
}

/* 样式穿透 */
::v-deep(.el-carousel__arrow) {
  color: #000000;
  background-color: #ffffff;
}
</style>
