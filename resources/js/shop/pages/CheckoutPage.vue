<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cart = useCartStore()
const form = ref({
    shipping_address: {
        name: '',
        line1: '',
        city: '',
        country: 'Philippines',
        postal_code: '',
    },
    coupon_code: '',
    notes: '',
})
const discount = ref(0)
const message = ref('')
const error = ref('')

async function applyCoupon() {
    error.value = ''
    try {
        const { data } = await api.post('/coupons/validate', {
            code: form.value.coupon_code,
            subtotal: cart.subtotal,
        })
        discount.value = data.discount
        message.value = `Coupon applied! You save $${data.discount.toFixed(2)}`
    } catch (e) {
        discount.value = 0
        error.value = e.response?.data?.message || 'Invalid coupon'
    }
}

async function placeOrder() {
    error.value = ''
    try {
        const { data } = await api.post('/checkout', form.value)
        await cart.fetchCart()
        router.push({ name: 'orders', query: { placed: data.order.order_number } })
    } catch (e) {
        error.value = e.response?.data?.message || 'Checkout failed'
    }
}
</script>

<template>
    <div class="shop-container" style="padding:2rem 0 3rem;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1.5rem;">Checkout</h1>

        <div class="shop-grid" style="grid-template-columns:1.1fr 0.9fr;gap:1.5rem;">
            <form class="shop-card" style="padding:1.25rem;display:grid;gap:0.85rem;" @submit.prevent="placeOrder">
                <h2 class="shop-title" style="font-size:1.1rem;">Shipping details</h2>
                <input v-model="form.shipping_address.name" class="shop-input" placeholder="Full name" required>
                <input v-model="form.shipping_address.line1" class="shop-input" placeholder="Address line" required>
                <input v-model="form.shipping_address.city" class="shop-input" placeholder="City" required>
                <input v-model="form.shipping_address.country" class="shop-input" placeholder="Country" required>
                <input v-model="form.shipping_address.postal_code" class="shop-input" placeholder="Postal code" required>
                <textarea v-model="form.notes" class="shop-input" rows="3" placeholder="Order notes (optional)"></textarea>
                <button class="shop-btn shop-btn-primary" type="submit">Place demo order</button>
                <p class="shop-muted" style="font-size:0.85rem;">Payment is simulated for portfolio demo purposes.</p>
            </form>

            <div class="shop-card" style="padding:1.25rem;height:fit-content;">
                <h2 class="shop-title" style="font-size:1.1rem;margin-bottom:0.75rem;">Summary</h2>
                <p style="display:flex;justify-content:space-between;"><span class="shop-muted">Subtotal</span><span>${{ cart.subtotal.toFixed(2) }}</span></p>
                <p style="display:flex;justify-content:space-between;margin-top:0.5rem;"><span class="shop-muted">Discount</span><span>- ${{ discount.toFixed(2) }}</span></p>
                <p style="display:flex;justify-content:space-between;margin-top:0.75rem;font-size:1.1rem;"><strong>Total</strong><strong>${{ Math.max(cart.subtotal - discount, 0).toFixed(2) }}</strong></p>

                <div style="display:flex;gap:0.5rem;margin-top:1rem;">
                    <input v-model="form.coupon_code" class="shop-input" placeholder="Coupon code">
                    <button type="button" class="shop-btn shop-btn-ghost" @click="applyCoupon">Apply</button>
                </div>
                <p v-if="message" style="margin-top:0.75rem;color:var(--shop-accent);">{{ message }}</p>
                <p v-if="error" style="margin-top:0.75rem;color:#f87171;">{{ error }}</p>
            </div>
        </div>
    </div>
</template>
