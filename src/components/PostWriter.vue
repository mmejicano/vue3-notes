<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TimelinePost } from '../posts';

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref<HTMLDivElement>()

console.log(content.value)
onMounted(() => { 
    console.log('Mounted')
    console.log(content.value?.innerText)
 })
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
                {{title}}
            </div>

            <div class="columns">
                <div class="column has-background-info-light m-2">
                    <div editable ref="content">This is div</div>

                </div>
                <div class="column has-background-success-light m-2">
                    preview
                </div>
            </div>
        </div>
    </div>
</template>



