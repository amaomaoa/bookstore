<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Announcement from "@/components/Announcement.vue";
import Search from "@/components/Search.vue";
import Navigationbar from "@/components/Navigationbar.vue";


</script>

<template>
    <Announcement />
    <Search />
    <Navigationbar />
    <RouterView />
</template>

<style>
body {
    margin: 0;
}
</style>
