<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { shopImageFallback } from '../utils/images'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()

onMounted(() => cart.fetchCart())
</script>

<template>
    <div class="shop-container" style="padding:2rem 0 3rem;">
        <h1 class="shop-title" style="font-size:2rem;margin-bottom:1.5rem;">Your cart</h1>

        <div v-if="!cart.items.length" class="shop-card" style="padding:2rem;text-align:center;">
            <p class="shop-muted" style="margin-bottom:1rem;">Your cart is empty.</p>
            <RouterLink to="/products" class="shop-btn shop-btn-primary" style="text-decoration:none;">Browse products</RouterLink>
        </div>

        <div v-else class="shop-grid" style="grid-template-columns:1.4fr 0.8fr;gap:1.5rem;">
            <div class="shop-card" style="padding:1rem;">
                <div v-for="item in cart.items" :key="item.id" style="display:flex;gap:1rem;padding:0.85rem 0;border-bottom:1px solid var(--shop-border);">
                    <img :src="item.product.image" :alt="item.product.name" style="width:96px;height:72px;object-fit:cover;border-radius:0.65rem;" @error="shopImageFallback">
                    <div style="flex:1;">
                        <strong>{{ item.product.name }}</strong>
                        <p class="shop-muted">${{ item.product.price }} each</p>
                        <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
                            <button class="shop-btn shop-btn-ghost" style="padding:0.35rem 0.7rem;" @click="cart.updateItem(item.id, Math.max(1, item.quantity - 1))">-</button>
                            <span>{{ item.quantity }}</span>
                            <button class="shop-btn shop-btn-ghost" style="padding:0.35rem 0.7rem;" @click="cart.updateItem(item.id, item.quantity + 1)">+</button>
                            <button class="shop-btn shop-btn-ghost" style="padding:0.35rem 0.7rem;margin-left:auto;" @click="cart.removeItem(item.id)">Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="shop-card" style="padding:1.25rem;height:fit-content;">
                <h2 class="shop-title" style="font-size:1.15rem;margin-bottom:0.75rem;">Order summary</h2>
                <p style="display:flex;justify-content:space-between;margin-bottom:0.5rem;"><span class="shop-muted">Subtotal</span><strong>${{ cart.subtotal.toFixed(2) }}</strong></p>
                <RouterLink to="/checkout" class="shop-btn shop-btn-primary" style="width:100%;text-decoration:none;margin-top:1rem;">Proceed to checkout</RouterLink>
            </div>
        </div>
    </div>
</template>
