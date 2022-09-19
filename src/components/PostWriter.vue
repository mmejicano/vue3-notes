<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { usePosts } from "../stores/postpinia";
import { useRouter } from "vue-router";


// const t = debounce(foo, 1000)

// PROPS
const props = defineProps<{
  post: TimelinePost;
}>();

// REACTIVE
const title = ref(props.post.title);
const markdown = ref(props.post.content);
const html = ref("");
const content = ref<HTMLDivElement>();

// Composables
const posts = usePosts()
const router = useRouter()


// WATCH AND LIFECYCLES
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

async function handleClick() {
    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        content: markdown.value,
        html: html.value
    }
    await posts.createPost(newPost)
    router.push('/')
    
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Title: </div>
        <input type="text" class="input" v-model="title" />
        <!-- {{ title }} -->
      </div>

      <div class="columns">
        <div class="column has-background-info-light m-2">
          <div contenteditable ref="content" @input="handleInput" />
        </div>
        <div class="column has-background-success-light m-2">
          <div v-html="html" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleClick">
                Guardar
            </button>
        </div>
      </div>
    </div>
  </div>
</template>



