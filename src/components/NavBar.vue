<script setup lang="ts">
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';

const modal = useModal()
const userStore = useUsers()

</script>
<template>
    <div class="navbar-menu mb-2">
        <div class="navbar-end">
            <div v-if="userStore.currentId" class="buttons">
                <button class="button" @click="userStore.logout()">Logout</button>
                <RouterLink to="/" class="navbar-item button">Home</RouterLink>
                <RouterLink to="/posts/new" class="navbar-item button">New Post</RouterLink>
            </div>
            <div v-else class="buttons">
                <button class="button" @click="modal.showModal('SignUp')">Registrar</button>
                <button class="button" @click="modal.showModal('SignIn')">Login</button>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value"/>
    </Teleport>
</template>