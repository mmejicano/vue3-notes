

<script setup lang="ts">
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';
import { NewUser } from '../users';
import UserForm from './UserForm.vue';

const userStore = useUsers()
const modal = useModal()

async function handleSignup(newUser: NewUser){
    
    await userStore.createUser(newUser)
    modal.hideModal()

}
</script>


<template>
    <UserForm @submit="handleSignup"/>
</template>
