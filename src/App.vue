<script setup lang="ts">
import { computed, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import { useModal } from "./composables/modal";
import FormInput from "./components/FormInput.vue";

const username = ref('')

const modal = useModal();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});
</script>

<template>

  <div class="modal" :style="modalStyle" style="color: white">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal">
          <FormInput name="Username" v-model="username"/>
        </div>
      </div>
    </div>
    <button @click="modal.hideModal()" class="modal-close is-large"></button>
  </div>

  <div class="section">
    <div class="container">
      <NavBar />
                {{username}}

      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}
p {
  margin: 10px 0 !important;
}
* {
  outline: none;
}
</style>
