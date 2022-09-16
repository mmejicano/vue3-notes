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
- v-if
- v-bind => :xxx
- v-on => @click for events (default envia valor e)

```html
<!-- Examples -->
<a v-for="period of periods" :key="period"> {{period}}</a>
```

### 5. Reactividad

Variable que se actualizara en el DOM cuando cambie de valor

1. variables

- let var1 = ref() + var1.value = "hola"
- let var2 = reactive() + var2 = "hola2"

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
```

