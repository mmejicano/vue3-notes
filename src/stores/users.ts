import { defineStore } from 'pinia';
import { NewUser } from '../users';

interface UserState {
    currentId?: string
}

export const useUsers = defineStore('users', {
    state: () => ({
        currentId: undefined
    }),
    actions: {
        async createUser(newUser: NewUser) {

            const body = JSON.stringify(newUser)
            await window.fetch("/api/users", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
            return this.authenticate()

        },
        async authenticate() {
            try {
                const res = await window.fetch('/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const result = await res.json()
                this.currentId = result.id
            } catch (error) {
                this.currentId = undefined
            }

        },
        async logout() {

            await window.fetch("/api/users/logout", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

            })
            return this.authenticate()
        }
    }
})