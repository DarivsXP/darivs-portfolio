<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { shopImageFallback } from '../utils/images'
import api from '../api'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const products = ref([])
const categories = ref([])
const search = ref(route.query.search?.toString() || '')
const category = ref(route.query.category?.toString() || '')
const sort = ref('newest')
const loading = ref(true)
const error = ref('')

async function loadProducts() {
    loading.value = true
    error.value = ''

    try {
        const { data } = await api.get('/products', {
            params: {
                search: search.value || undefined,
                category: category.value || undefined,
                sort: sort.value,
            },
        })

        products.value = data.data ?? data
    } catch (e) {
        products.value = []
        error.value = e.response?.data?.message || 'Could not load products. Please refresh the page.'
    } finally {
        loading.value = false
    }
}

async function loadCategories() {
    try {
        const { data } = await api.get('/categories')
        categories.value = Array.isArray(data) ? data : []
    } catch {
        categories.value = []
    }
}

function applyFilters() {
    router.push({
        path: '/products',
        query: {
            ...(search.value ? { search: search.value } : {}),
            ...(category.value ? { category: category.value } : {}),
        },
    })
}

function onCategoryChange() {
    applyFilters()
    loadProducts()
}

function onSortChange() {
    loadProducts()
}

onMounted(async () => {
    await loadCategories()
    await loadProducts()
})

watch(() => route.query, async (query) => {
    search.value = query.search?.toString() || ''
    category.value = query.category?.toString() || ''
    await loadProducts()
}, { deep: true })

async function add(productId) {
    await cart.addToCart(productId)
}
</script>

<template>
    <div class="shop-container" style="padding:2rem 0 3rem;">
        <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem;">
            <h1 class="shop-title" style="font-size:2rem;">All products</h1>
            <div class="shop-filter-bar">
                <input
                    v-model="search"
                    class="shop-input"
                    type="search"
                    placeholder="Search products..."
                    @keyup.enter="applyFilters"
                >
                <select v-model="category" class="shop-input shop-select" @change="onCategoryChange">
                    <option value="">All categories</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.slug">
                        {{ cat.name }} ({{ cat.products_count }})
                    </option>
                </select>
                <select v-model="sort" class="shop-input shop-select" @change="onSortChange">
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name">Name</option>
                </select>
                <button class="shop-btn shop-btn-primary" type="button" @click="applyFilters">Apply</button>
            </div>
        </div>

        <p v-if="loading" class="shop-muted">Loading products...</p>

        <div v-else-if="error" class="shop-empty">
            <p style="color:#f87171;margin-bottom:0.75rem;">{{ error }}</p>
            <button class="shop-btn shop-btn-ghost" type="button" @click="loadProducts">Try again</button>
        </div>

        <div v-else-if="!products.length" class="shop-empty">
            <p class="shop-muted" style="margin-bottom:0.75rem;">
                No products found{{ category ? ' in this category' : '' }}.
            </p>
            <p v-if="!categories.length" class="shop-muted" style="margin-bottom:1rem;font-size:0.9rem;">
                Categories have not been loaded yet. If this is a fresh deploy, run the database seeder on the server.
            </p>
            <RouterLink to="/products" class="shop-btn shop-btn-primary" style="text-decoration:none;" @click="category = ''; search = ''; loadProducts()">
                View all products
            </RouterLink>
        </div>

        <div v-else class="shop-grid shop-grid-4">
            <article v-for="product in products" :key="product.id" class="shop-card" style="padding:1rem;display:flex;flex-direction:column;">
                <RouterLink :to="`/products/${product.slug}`" style="text-decoration:none;color:inherit;">
                    <img :src="product.image" :alt="product.name" class="shop-product-image" @error="shopImageFallback">
                    <p class="shop-badge" style="margin-top:0.85rem;">{{ product.category?.name }}</p>
                    <h2 class="shop-title" style="font-size:1.05rem;margin:0.5rem 0;">{{ product.name }}</h2>
                    <p class="shop-muted" style="font-size:0.9rem;line-height:1.5;">{{ product.description.slice(0, 90) }}...</p>
                    <div style="margin-top:0.75rem;display:flex;gap:0.5rem;align-items:center;">
                        <strong>${{ product.price }}</strong>
                        <span v-if="product.compare_price" class="shop-muted" style="text-decoration:line-through;">${{ product.compare_price }}</span>
                    </div>
                </RouterLink>
                <button class="shop-btn shop-btn-primary" style="margin-top:auto;" @click="add(product.id)">Add to cart</button>
            </article>
        </div>
    </div>
</template>
