<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'

const dashboard = ref(null)

onMounted(async () => {
    const { data } = await api.get('/admin/dashboard')
    dashboard.value = data
})
</script>

<template>
    <div v-if="dashboard" class="shop-container" style="padding:2rem 0 3rem;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1.5rem;">Admin dashboard</h1>

        <div class="shop-grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem;">
            <div class="shop-stat"><p class="shop-muted">Products</p><strong style="font-size:1.6rem;">{{ dashboard.stats.products }}</strong></div>
            <div class="shop-stat"><p class="shop-muted">Orders</p><strong style="font-size:1.6rem;">{{ dashboard.stats.orders }}</strong></div>
            <div class="shop-stat"><p class="shop-muted">Customers</p><strong style="font-size:1.6rem;">{{ dashboard.stats.customers }}</strong></div>
            <div class="shop-stat"><p class="shop-muted">Revenue</p><strong style="font-size:1.6rem;">${{ dashboard.stats.revenue.toFixed(2) }}</strong></div>
        </div>

        <div class="shop-grid" style="grid-template-columns:1.2fr 0.8fr;gap:1.5rem;">
            <section class="shop-card" style="padding:1rem;">
                <h2 class="shop-title" style="font-size:1.1rem;margin-bottom:0.75rem;">Recent orders</h2>
                <table class="shop-table">
                    <thead>
                        <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in dashboard.recent_orders" :key="order.id">
                            <td>{{ order.order_number }}</td>
                            <td>{{ order.user?.name }}</td>
                            <td>${{ order.total }}</td>
                            <td><span class="shop-badge">{{ order.status }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="shop-card" style="padding:1rem;">
                <h2 class="shop-title" style="font-size:1.1rem;margin-bottom:0.75rem;">Low stock</h2>
                <div v-for="product in dashboard.low_stock" :key="product.id" style="display:flex;justify-content:space-between;padding:0.55rem 0;border-bottom:1px solid var(--shop-border);">
                    <span>{{ product.name }}</span>
                    <span class="shop-muted">{{ product.stock }} left</span>
                </div>
            </section>
        </div>

        <p class="shop-muted" style="margin-top:1.5rem;">Admin login: admin@vertexshop.demo / password</p>
    </div>
</template>
