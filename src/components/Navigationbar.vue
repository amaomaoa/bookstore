<script setup lang="ts"></script>

<template>
    <div class="main">
        <nav>
            <RouterLink to="/">首页</RouterLink> ||
            <RouterLink to="/tag/小说">小说</RouterLink> |
            <RouterLink to="/tag/随笔">随笔</RouterLink> |
            <RouterLink to="/tag/日本文学">日本文学</RouterLink> |
            <RouterLink to="/tag/散文">散文</RouterLink> |
            <RouterLink to="/tag/诗歌">诗歌</RouterLink> |
            <RouterLink to="/tag/童话">童话</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.main{
    width: 1100px;
    margin: 30px auto 30px auto;
}
nav {
    font-size: 20px;
    text-align: center;
    margin: auto;
}
nav a {
    margin: auto 25px auto 25px;
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}
nav a.router-link-exact-active {
    color: green;
}
nav a.router-link-exact-active:hover {
    background-color: transparent;
}

a {
    text-decoration: none;
    color: rgb(11, 11, 11);
    transition: 0.4s;
}
</style>
