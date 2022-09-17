<template>
    <p>New post</p>
    <PostWriter :post="post"/>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { TimelinePost } from '../posts';

const post: TimelinePost = {
    id: "4",
    title: "prueba",
    created: DateTime.now()
}
</script>

