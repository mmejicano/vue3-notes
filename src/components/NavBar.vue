<script setup lang="ts">
import { useModal } from '../composables/modal';

const modal = useModal()


</script>
<template>
    <div class="navbar-menu mb-2">
        <div class="navbar-end">
            <div class="buttons">
                <button class="button" @click="modal.showModal()">Registrar</button>
                <RouterLink to="/" class="navbar-item">Home</RouterLink>
                <RouterLink to="/posts/new" class="navbar-item">New Post</RouterLink>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        
    </Teleport>
</template>