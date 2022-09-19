<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';

const post: TimelinePost = {
    id: "4",
    title: "prueba",
    created: DateTime.now(),
    content: '# Title'
}
</script>

<template>
    <p class="is-uppercase has-text-centered">Crear nuevo post</p>
    <PostWriter :post="post"/>
</template>