<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "./FormInput.vue";
import { required, length, validate } from "../validation";
import { NewUser } from '../users';
import { useUsers } from '../stores/users';
import { useModal } from "../composables/modal";

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (e: 'submit', payload: NewUser): void
}>()

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })]);
});

const isInvalid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
});

const userStore = useUsers();
const modal = useModal()

async function handleSubmit() {

    if(isInvalid.value) return
    const newUser: NewUser = {
        username: username.value,
        password: password.value
    }
    // console.log(newUser)
    try {
        emit('submit', newUser);
             
    } catch (e) {
    }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="box mt-6">
    <FormInput type="text" :status="usernameStatus" name="Username" v-model="username" />
    <FormInput type="password" :status="passwordStatus" name="Password" v-model="password" />

    <div v-if="error" class="is-danger help">
      {{error}}
    </div>
    <button class="button">Login</button>
  </form>
  <!-- {{ username }} -->
</template>

