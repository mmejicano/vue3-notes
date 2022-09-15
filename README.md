# NOTAS VUE 3

### 1. Crear proyecto vue
```bash
yarn create vite myapp --template vue-ts
cd myapp
yarn
yarn dev
```

### 2. SFComponente

- `<script setup lang="ts"> `
   ` import HelloWorld from './components/HelloWorld.vue'`
- `<template> `
- `<style>`

### 3. CSS global cdn

- delete import and file styles.css default
- add `<style>` at index.html or
- add @import at App.vue > style  

### 4. Directivas

- {{ variable }}
- v-for, importante :key
- v-if
- v-bind => :xxx

```html
<a v-for="period of periods"> {{period}}</a>
``` 