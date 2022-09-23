

<script setup lang="ts">
import { ref } from 'vue-demi';
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';
import { NewUser } from '../users';
import UserForm from './UserForm.vue';

const userStore = useUsers()
const modal = useModal()
const error = ref('')
async function handleSignin(newUser: NewUser){
    
    // 1. request
    const body = JSON.stringify(newUser)
            const res = await window.fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })

    // 2. succcess -> authenticate

    // 3. fail --> 401,404 --> error
    if([401,404].includes(res.status)){
        error.value = "username or password incorrect"
    }else {
        userStore.authenticate();
        modal.hideModal();
    }

}
console.log('first')
</script>


<template>
    <UserForm @submit="handleSignin" :error="error"/>
</template>
