import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loaded: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => !!state.user?.is_admin,
    },
    actions: {
        async fetchUser() {
            const { data } = await api.get('/user')
            this.user = data.user
            this.loaded = true
        },
        async login(credentials) {
            const { data } = await api.post('/login', credentials)
            this.user = data.user
        },
        async register(payload) {
            const { data } = await api.post('/register', payload)
            this.user = data.user
        },
        async logout() {
            await api.post('/logout')
            this.user = null
        },
    },
})
