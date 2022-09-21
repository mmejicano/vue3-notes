# NOTAS: VUE 3 + Composition API

---

## Composition API

> requiere atributo o function setup(){return}
> export the component by default
> variables and methods available on template
> cycle life is a method

### 1. Crear proyecto vue

```bash
yarn create vite myapp --template vue-ts
cd myapp
yarn
yarn dev
```

### 2. SFComponente

- `<script setup lang="ts">`
  `import HelloWorld from './components/HelloWorld.vue'`
- `<template>` similar a Fragment <>
- `<style>`
- Props => defineProps<{post: Post;}>()

### 3. CSS global cdn

- delete import and file styles.css default
- add `<style>` at index.html or
- add @import at App.vue > style

### 4. Template actions

a. {{ variable }} => default scape characters
b. directivas

- v-for, importante :key
- v-if / v-show = hidden
- v-bind => :xxx
- v-on => @click for events (default envia valor e)
  - @click, @input, @submit
  - modifiers: .prevent, .trim
- v-model
- v-html

c. slot
d. teleport: inyecta contentido en otro componente

```html
<!-- Examples -->
<a v-for="period of periods" :key="period"> {{period}}</a>
<div contenteditable ref="content" @input="handleInput"/>

<Teleport to="#modal">Content</Teleport>
<div id="modal"></div>
```

### 5. Reactividad

> Variable que se actualizara en el DOM cuando cambie de valor

1. variables reactivas

- let var1 = ref() + var1.value = "hola" => en template count++
- let var2 = reactive() + var2 = "hola2" => solo para objects

2. computed properties

  - usar cuando no sea necesario crear una nueva variable solo derivar de un valor existente
  - debe ser un calculo simple y no puede ser asincrono

- const posts = computed(() => [today, thisWeek, thisMonth])
```js
const modalStyle = computed(() => { 
  return {
    display: modal.show.value ? 'block': 'none'
  }
 })
```

3. watch => similar to computed properties but async, requiere indicar dependencia reactiva

```js
watch(
  markdown,
  (newContent) => {
    marked.parse(newContent, (err, result) => {
      html.value = result;
    });
  },
  { immediate: true }
);
```

4. watchEffect => similar to watch but no requiere especificar dependencia, detecta el cambio de la variable reactiva internas

### 6. Typescript

- Tipado de datos y POO para javascript
- reduce errores+autocompletado en tiempo de escritura
- se indica con :tipo delante de la variable o funcion

```ts
// type Period = "Today" | "This Week" | "This Month"
// const periods: Period[] = ["Today", "This Week", "This Month"]
// const periods: string[] = ["Today", "Week", "Month"]

const periods = ['Today', 'This Week', 'This Month'] as const;
type Period = typeof periods[number];

const optionSelect = ref<Period>('Today');

function selectPeriod(period: Period) {
  optionSelect.value = period;
}

export interface Post {
  id: string;
  title: string;
  created: string;
}

export interface TimelinePost extends Omit<Post, 'created'> {
  created: DateTime;
}
```

### 7. Library

- axios => peticiones http
- Moment => luxon: manejo de fechas
- marked => convert md to html
- highlight.js => resaltador
- pinia => state
- vue router => routes
- lodash => utilities like debounce

```bash
yarn add luxon
yarn add -D @types/luxon
yarn add pinia
yarn add vue-router
yarn add axios
yarn add marked @types/marked
yarn add lodash @types/lodash
yarn add highlight.js
```

### 8. Global state

- custom => interface + class (reactive+readonly) + function
- pinia: `yarn add pinia`

```js
// main.ts
import { createPinia } from 'pinia'

createApp(App)
    .use(createPinia())
    .mount('#app')

// store/posts.ts
import { defineStore } from "pinia"

interface PostsState {
    foo: string
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({ // reactive on pinia
        foo: "foo"
    }),

    actions: { // methods on pinia
        updateFoo(value: string) {
            this.foo = value
        }
    },
    getters: { // computed properties on pinia
        filteredPosts: (state) => foo.upperCase()
})

// component
import { usePosts } from '../stores/postpinia';
const postsStore = usePosts()

<template>
 {{ postsStore.foo }}
  <button @click="postsStore.updateFoo(estado)"
    Update
  </button>
</template>
```

- vuex

### 9. Fetching data and Suspense

```js
// pinia store
 actions: {
    async fetchPosts() {
        const res = await window.fetch("http://localhost:8000/posts")
        const data = (await res.json()) as Post[]
    }
 }
 // component Timeline.vue
 await postsStore.fetchPosts()
 // to use await on setup need to:
 // 1. wrap component on a Suspense component
 // 2. provide 2 component (template) using slot: #defaul and #fallback

 // App.vue
<Suspense>
    <template #default>
        <Timeline />
    </template>
    <template #fallback>
        Loading...
    </template>
</Suspense>
```

### 10. Router

1. yarn add vue-router
2. create router.ts + views/
3. edit main.ts => use(router)
4. add `<RouterView>`
5. add `<RouterLink to="/posts/new" class="navbar-item">New Post</RouterLink>`

```ts
export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: Home }],
});

// - manual route
const router = useRouter()
router.push('/')


// "cache": mantiene el estado anterior
<router-view v-slot="{Component}">
  <keep-alive>
    <component :is="Component"/>
  </keep-alive>
</router-view>
```


### 11. Formularios

1. = variable reactiva
2. v-model on template => :value + @input
   - asigna valor al input y guarda valor en variable ref
3. validation

- custom:
- packages: vee-validate

```html
<input
  v-model="title"
  :value="title"
  @input="e => title.value = e.target.value"
/>

<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>

```

### 11.1 Validation framework

1. validate required field
2. validate 

```js
export interface Status {
    valid: boolean
    message?: string
}
// declara un tipo function que retorna un Status
type Rule = (value: string) => Status

export const required: Rule = (value: string): Status => {
    const result = Boolean(value)
    return {
        valid: result,
        message: result ? undefined:'This field is required'
    }
}

export function validate(value: string, rules: Rule[]): Status {
    for (const rule of rules) {
        const result = rule(value)
        if (!result.valid) {
            return result
        }
    }
    return {
        valid: true
    }
}
```

### 12. Lifecycles

- created (code exec once on setup script when component is created)  
- mounted (exec when dom loaded already)
- functions autoejecutadas with callback

```js
onMounted(() => {})
onUnmounted(() => {})
onBeforeUpdate(() => {})
```

### 13. DOM access

- div with contenteditable allow write text

```js
const content = ref<HTMLDivElement>()
console.log(content.value?.innerText)
console.log(content.value)

<div contenteditable ref="content">This is div</div>
```

### 14. Optimization

> debounce: delay on typing before exec function => lodash

```js
function foo() {
    console.log("first")
}
const t = debounce(foo, 1000)
t()
// ----
watch(markdown, debounce(parseHtml, 250),{immediate: true})

```

> lazy Loading
> cache

### 15. Composables

> is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic
> puede retornar un objeto con el state y las funciones que modifican el state

```js
const show = ref(false)
export function useModal() {
    return {
        show,
        showModal: () => (show.value = true),
        hideModal: () => (show.value = false),
    }
}
```

### 16. Custom events

```js
const emit = defineEmits<{
    (event: 'update:modelValue', value:string): void
}>()

function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value
    emit('update:modelValue', value)
}
```

### 17. Proxy

### 18. References

[Vue docs](https://vuejs.org/guide/reusability/composables.html#composables)
[Bulma css docs](https://bulma.io/documentation/)
[MD cheat](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
[Couse vue udemy](https://www.udemy.com/course/vuejs-3-the-composition-api/)
[This.Project repositorie](https://github.com/lmiller1990/vuejs-composition-api-v3)
[Other projects vue](https://github.com/mmejicano/complete-vuejs)
[Youtube channel author](https://www.youtube.com/c/LachlanMiller)
[vue pattern](https://learn-vuejs.github.io/vue-patterns/es/patterns/)
