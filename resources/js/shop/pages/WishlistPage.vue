<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { shopImageFallback } from '../utils/images'
import api from '../api'

const items = ref([])

onMounted(async () => {
    const { data } = await api.get('/wishlist')
    items.value = data
})
</script>

<template>
    <div class="shop-container" style="padding:2rem 0 3rem;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1.5rem;">Wishlist</h1>
        <div v-if="!items.length" class="shop-muted">No saved items yet.</div>
        <div v-else class="shop-grid shop-grid-4">
            <article v-for="item in items" :key="item.id" class="shop-card" style="padding:1rem;">
                <RouterLink :to="`/products/${item.product.slug}`" style="text-decoration:none;color:inherit;">
                    <img :src="item.product.image" :alt="item.product.name" class="shop-product-image" @error="shopImageFallback">
                    <h2 class="shop-title" style="font-size:1rem;margin-top:0.75rem;">{{ item.product.name }}</h2>
                    <p class="shop-muted">${{ item.product.price }}</p>
                </RouterLink>
            </article>
        </div>
    </div>
</template>
