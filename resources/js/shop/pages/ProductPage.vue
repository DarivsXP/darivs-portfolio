<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { shopImageFallback } from '../utils/images'
import api from '../api'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const auth = useAuthStore()
const cart = useCartStore()
const product = ref(null)
const review = ref({ rating: 5, comment: '' })
const message = ref('')

onMounted(async () => {
    const { data } = await api.get(`/products/${route.params.slug}`)
    product.value = data
})

async function addToCart() {
    await cart.addToCart(product.value.id)
    message.value = 'Added to cart!'
}

async function toggleWishlist() {
    if (!auth.isAuthenticated) return
    await api.post(`/wishlist/${product.value.id}`)
    message.value = 'Added to wishlist!'
}

async function submitReview() {
    await api.post(`/products/${product.value.id}/reviews`, review.value)
    const { data } = await api.get(`/products/${route.params.slug}`)
    product.value = data
    message.value = 'Review submitted!'
}
</script>

<template>
    <div v-if="product" class="shop-container" style="padding:2rem 0 3rem;">
        <div class="shop-grid" style="grid-template-columns:1.1fr 1fr;gap:2rem;">
            <img :src="product.image" :alt="product.name" class="shop-product-image" style="border-radius:1rem;" @error="shopImageFallback">
            <div>
                <p class="shop-badge">{{ product.category?.name }}</p>
                <h1 class="shop-title" style="font-size:2rem;margin:0.75rem 0;">{{ product.name }}</h1>
                <div style="display:flex;gap:0.75rem;align-items:center;margin-bottom:1rem;">
                    <strong style="font-size:1.5rem;">${{ product.price }}</strong>
                    <span v-if="product.compare_price" class="shop-muted" style="text-decoration:line-through;">${{ product.compare_price }}</span>
                    <span class="shop-muted">★ {{ Number(product.reviews_avg_rating || 0).toFixed(1) }} ({{ product.reviews_count }})</span>
                </div>
                <p class="shop-muted" style="line-height:1.7;margin-bottom:1.25rem;">{{ product.description }}</p>
                <p class="shop-muted" style="margin-bottom:1rem;">{{ product.stock }} in stock</p>
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    <button class="shop-btn shop-btn-primary" @click="addToCart">Add to cart</button>
                    <button v-if="auth.isAuthenticated" class="shop-btn shop-btn-ghost" @click="toggleWishlist">Save to wishlist</button>
                </div>
                <p v-if="message" style="margin-top:1rem;color:var(--shop-accent);">{{ message }}</p>
            </div>
        </div>

        <section style="margin-top:3rem;">
            <h2 class="shop-title" style="font-size:1.35rem;margin-bottom:1rem;">Reviews</h2>
            <div v-if="auth.isAuthenticated" class="shop-card" style="padding:1rem;margin-bottom:1rem;">
                <div style="display:grid;gap:0.75rem;max-width:480px;">
                    <select v-model="review.rating" class="shop-input">
                        <option v-for="n in 5" :key="n" :value="n">{{ n }} stars</option>
                    </select>
                    <textarea v-model="review.comment" class="shop-input" rows="3" placeholder="Share your thoughts"></textarea>
                    <button class="shop-btn shop-btn-primary" style="width:fit-content;" @click="submitReview">Submit review</button>
                </div>
            </div>
            <div class="shop-grid shop-grid-3">
                <article v-for="item in product.reviews" :key="item.id" class="shop-card" style="padding:1rem;">
                    <strong>{{ item.user?.name }}</strong>
                    <p class="shop-muted" style="margin:0.35rem 0;">★ {{ item.rating }}</p>
                    <p>{{ item.comment }}</p>
                </article>
            </div>
        </section>
    </div>
</template>
