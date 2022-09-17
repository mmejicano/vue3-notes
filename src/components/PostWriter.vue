<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TimelinePost } from '../posts';

const props = defineProps<{
    post: TimelinePost
}>()
</script>

