<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const form = ref({ email: 'customer@vertexshop.demo', password: 'password', remember: true })
const error = ref('')

async function submit() {
    error.value = ''
    try {
        await auth.login(form.value)
        router.push(route.query.redirect || '/')
    } catch (e) {
        error.value = e.response?.data?.message || 'Login failed'
    }
}
</script>

<template>
    <div class="shop-container" style="padding:3rem 0;max-width:480px;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:0.5rem;">Sign in</h1>
        <p class="shop-muted" style="margin-bottom:1.5rem;">Demo account: customer@vertexshop.demo / password</p>
        <form class="shop-card" style="padding:1.25rem;display:grid;gap:0.85rem;" @submit.prevent="submit">
            <input v-model="form.email" class="shop-input" type="email" placeholder="Email" required>
            <input v-model="form.password" class="shop-input" type="password" placeholder="Password" required>
            <button class="shop-btn shop-btn-primary" type="submit">Sign in</button>
            <p v-if="error" style="color:#f87171;">{{ error }}</p>
            <p class="shop-muted">No account? <RouterLink to="/register" style="color:var(--shop-accent);">Register</RouterLink></p>
        </form>
    </div>
</template>
