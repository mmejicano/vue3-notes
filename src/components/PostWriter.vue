<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'

function parseHtml(markdown:string) {
   marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => { 
            return highlightjs.highlightAuto(code).value
         }
    }, (err, result) => {
      html.value = result;
    });
}
// const t = debounce(foo, 1000)


const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const markdown = ref(props.post.content);
const html = ref("");
const content = ref<HTMLDivElement>();

watch(markdown, debounce(parseHtml, 250),{immediate: true})
// console.log(content.value)
// watch(
//   markdown,
//   (newContent) => {
//     marked.parse(newContent, (err, result) => {
//       html.value = result;
//     });
//   },
//   { immediate: true }
// );
onMounted(() => {
  // console.log('Mounted')
  // console.log(content.value?.innerText)
  if (!content.value) {
    throw Error("Content dom node was not found");
  }
  content.value.innerText = markdown.value;
});

function handleInput() {
  if (!content.value) {
    throw Error("Content dom node was not found");
  }
  markdown.value = content.value?.innerText;
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
        {{ title }}
      </div>

      <div class="columns">
        <div class="column has-background-info-light m-2">
          <div contenteditable ref="content" @input="handleInput" />
        </div>
        <div class="column has-background-success-light m-2">
          <div v-html="html" />
        </div>
      </div>
    </div>
  </div>
</template>



