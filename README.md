# NOTAS VUE 3

## Composition API

- requiere atributo o function setup()
- export the component by default
- variables and methods available on template
- cycle life is a method

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
- `<template>`
- `<style>`
- Props => defineProps<{post: Post;}>()

### 3. CSS global cdn

- delete import and file styles.css default
- add `<style>` at index.html or
- add @import at App.vue > style  

### 4. Template actions

a. {{ variable }}
b. directivas

- v-for, importante :key
- v-if / v-show = hidden
- v-bind => :xxx
- v-on => @click for events (default envia valor e)
- v-model

```html
<!-- Examples -->
<a v-for="period of periods" :key="period"> {{period}}</a>
```

### 5. Reactividad

Variable que se actualizara en el DOM cuando cambie de valor

1. variables

- let var1 = ref() + var1.value = "hola" => en template count++
- let var2 = reactive() + var2 = "hola2" => solo para objects

2. computed: usar cuando no sea necesario crea una nueva variable solo derivar de un valor existente

- const posts = computed(() =>  [today, thisWeek, thisMonth])

### 6. Typescript

- Tipado de datos y POO para javascript
- reduce errores+autocompletado en tiempo de escritura
- se indica con :tipo delante de la variable o funcion

```ts
// type Period = "Today" | "This Week" | "This Month"
// const periods: Period[] = ["Today", "This Week", "This Month"]
// const periods: string[] = ["Today", "Week", "Month"]

const periods = ["Today", "This Week", "This Month"] as const
type Period = typeof periods[number]

const optionSelect = ref<Period>( "Today")

function selectPeriod(period: Period) {
    optionSelect.value = period
}

export interface Post {
    id: string
    title: string
    created: string
}

export interface TimelinePost extends Omit<Post, 'created'> {
    created: DateTime
}
```

### 7. Library

- Moment => luxon: manejo de fechas

```bash
yarn add luxon
yarn add -D @types/luxon
yarn add pinia
```

### Global state

- custom = interface + class (reactive+readonly) + function
- pinia: yarn add pinia

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