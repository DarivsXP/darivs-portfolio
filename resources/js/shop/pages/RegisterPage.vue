<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})
const error = ref('')

async function submit() {
    error.value = ''
    try {
        await auth.register(form.value)
        router.push('/')
    } catch (e) {
        error.value = e.response?.data?.message || 'Registration failed'
    }
}
</script>

<template>
    <div class="shop-container" style="padding:3rem 0;max-width:480px;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1.5rem;">Create account</h1>
        <form class="shop-card" style="padding:1.25rem;display:grid;gap:0.85rem;" @submit.prevent="submit">
            <input v-model="form.name" class="shop-input" placeholder="Name" required>
            <input v-model="form.email" class="shop-input" type="email" placeholder="Email" required>
            <input v-model="form.password" class="shop-input" type="password" placeholder="Password" required>
            <input v-model="form.password_confirmation" class="shop-input" type="password" placeholder="Confirm password" required>
            <button class="shop-btn shop-btn-primary" type="submit">Register</button>
            <p v-if="error" style="color:#f87171;">{{ error }}</p>
            <p class="shop-muted">Already have an account? <RouterLink to="/login" style="color:var(--shop-accent);">Sign in</RouterLink></p>
        </form>
    </div>
</template>
