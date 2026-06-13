<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'

const auth = useAuthStore()
const cart = useCartStore()
const isLight = ref(localStorage.getItem('vertexshop-theme') === 'light')

function toggleTheme() {
    isLight.value = !isLight.value
    localStorage.setItem('vertexshop-theme', isLight.value ? 'light' : 'dark')
    document.body.classList.toggle('light', isLight.value)
}

onMounted(async () => {
    document.body.classList.toggle('light', isLight.value)
    await cart.fetchCart()
})
</script>

<template>
    <div>
        <div class="shop-demo-banner">
            <span class="shop-container">
                Demo store only — payments are simulated. Try coupon <strong>VERTEX10</strong> at checkout.
            </span>
        </div>

        <header class="shop-nav">
            <div class="shop-container" style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;">
                <RouterLink to="/" class="shop-title" style="font-size:1.35rem;color:var(--shop-text);text-decoration:none;">
                    Vertex<span style="color:var(--shop-accent)">Shop</span>
                </RouterLink>

                <nav class="shop-hide-mobile" style="display:flex;gap:1.25rem;align-items:center;">
                    <RouterLink to="/products" style="color:var(--shop-muted);text-decoration:none;">Products</RouterLink>
                    <RouterLink v-if="auth.isAuthenticated" to="/orders" style="color:var(--shop-muted);text-decoration:none;">Orders</RouterLink>
                    <RouterLink v-if="auth.isAuthenticated" to="/wishlist" style="color:var(--shop-muted);text-decoration:none;">Wishlist</RouterLink>
                    <RouterLink v-if="auth.isAdmin" to="/admin" style="color:var(--shop-accent);text-decoration:none;">Admin</RouterLink>
                </nav>

                <div style="display:flex;gap:0.75rem;align-items:center;">
                    <button class="shop-btn shop-btn-ghost" style="padding:0.5rem 0.85rem;" @click="toggleTheme">
                        {{ isLight ? '🌙' : '☀️' }}
                    </button>
                    <RouterLink to="/cart" class="shop-btn shop-btn-ghost" style="padding:0.5rem 0.95rem;text-decoration:none;">
                        Cart ({{ cart.count }})
                    </RouterLink>
                    <RouterLink v-if="!auth.isAuthenticated" to="/login" class="shop-btn shop-btn-primary" style="text-decoration:none;">
                        Sign in
                    </RouterLink>
                    <button v-else class="shop-btn shop-btn-ghost" @click="auth.logout()">
                        Logout
                    </button>
                </div>
            </div>
        </header>

        <main>
            <RouterView />
        </main>

        <footer style="margin-top:4rem;border-top:1px solid var(--shop-border);padding:2rem 0;">
            <div class="shop-container shop-muted" style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
                <span>VertexShop by V Cyril Darivs Egipto</span>
                <a href="/" style="color:var(--shop-accent);text-decoration:none;">← Back to portfolio</a>
            </div>
        </footer>
    </div>
</template>
