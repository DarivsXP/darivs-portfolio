<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { shopImageFallback } from '../utils/images'
import api from '../api'

const categories = ref([])
const featured = ref([])

onMounted(async () => {
    const [catRes, prodRes] = await Promise.all([
        api.get('/categories'),
        api.get('/products', { params: { featured: true } }),
    ])
    categories.value = catRes.data
    featured.value = prodRes.data.data ?? prodRes.data
})
</script>

<template>
    <section class="shop-hero">
        <div class="shop-container">
            <p class="shop-badge">Full-stack e-commerce demo</p>
            <h1 class="shop-title" style="font-size:clamp(2.2rem,5vw,3.5rem);margin:1rem 0;">
                Developer gear for builders who ship.
            </h1>
            <p class="shop-muted" style="max-width:640px;font-size:1.1rem;line-height:1.7;margin-bottom:1.5rem;">
                VertexShop showcases a production-style storefront with Laravel APIs, Vue 3, cart flow,
                wishlist, coupons, and an admin dashboard — all on one domain.
            </p>
            <div style="display:flex;gap:0.85rem;flex-wrap:wrap;">
                <RouterLink to="/products" class="shop-btn shop-btn-primary" style="text-decoration:none;">Browse products</RouterLink>
                <RouterLink to="/login" class="shop-btn shop-btn-ghost" style="text-decoration:none;">Demo login</RouterLink>
            </div>
        </div>
    </section>

    <section class="shop-container" style="padding:2rem 0 1rem;">
        <h2 class="shop-title" style="font-size:1.5rem;margin-bottom:1rem;">Shop by category</h2>
        <div class="shop-grid shop-grid-4">
            <RouterLink
                v-for="category in categories"
                :key="category.id"
                :to="`/products?category=${category.slug}`"
                class="shop-card"
                style="padding:1rem;text-decoration:none;color:inherit;overflow:hidden;"
            >
                <img :src="category.image" :alt="category.name" class="shop-product-image" style="margin-bottom:0.85rem;" @error="shopImageFallback">
                <h3 class="shop-title" style="font-size:1.05rem;">{{ category.name }}</h3>
                <p class="shop-muted" style="font-size:0.9rem;margin-top:0.35rem;">{{ category.products_count }} products</p>
            </RouterLink>
        </div>
    </section>

    <section class="shop-container" style="padding:2rem 0 3rem;">
        <h2 class="shop-title" style="font-size:1.5rem;margin-bottom:1rem;">Featured picks</h2>
        <div class="shop-grid shop-grid-4">
            <article v-for="product in featured" :key="product.id" class="shop-card" style="padding:1rem;">
                <RouterLink :to="`/products/${product.slug}`" style="text-decoration:none;color:inherit;">
                    <img :src="product.image" :alt="product.name" class="shop-product-image" @error="shopImageFallback">
                    <h3 class="shop-title" style="font-size:1rem;margin:0.85rem 0 0.35rem;">{{ product.name }}</h3>
                    <p class="shop-muted" style="font-size:0.9rem;">${{ product.price }}</p>
                </RouterLink>
            </article>
        </div>
    </section>
</template>
