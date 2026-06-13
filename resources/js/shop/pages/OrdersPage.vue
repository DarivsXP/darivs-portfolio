<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'

const route = useRoute()
const orders = ref([])
const notice = ref(route.query.placed || '')

onMounted(async () => {
    const { data } = await api.get('/orders')
    orders.value = data.data
})
</script>

<template>
    <div class="shop-container" style="padding:2rem 0 3rem;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1rem;">Order history</h1>
        <p v-if="notice" class="shop-card" style="padding:1rem;margin-bottom:1rem;color:var(--shop-accent);">
            Order {{ notice }} placed successfully!
        </p>

        <div v-if="!orders.length" class="shop-muted">No orders yet.</div>

        <div v-else class="shop-grid" style="gap:1rem;">
            <article v-for="order in orders" :key="order.id" class="shop-card" style="padding:1.25rem;">
                <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
                    <div>
                        <strong>{{ order.order_number }}</strong>
                        <p class="shop-muted">{{ new Date(order.created_at).toLocaleString() }}</p>
                    </div>
                    <div style="text-align:right;">
                        <span class="shop-badge">{{ order.status }}</span>
                        <p style="margin-top:0.5rem;"><strong>${{ order.total }}</strong></p>
                    </div>
                </div>
                <ul style="margin-top:1rem;padding-left:1rem;">
                    <li v-for="item in order.items" :key="item.id" class="shop-muted">
                        {{ item.quantity }} × {{ item.product_name }} — ${{ item.price }}
                    </li>
                </ul>
            </article>
        </div>
    </div>
</template>
