import { defineStore } from 'pinia'
import api from '../api'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        subtotal: 0,
        count: 0,
        loading: false,
    }),
    actions: {
        async fetchCart() {
            this.loading = true
            try {
                const { data } = await api.get('/cart')
                this.items = data.items
                this.subtotal = data.subtotal
                this.count = data.count
            } finally {
                this.loading = false
            }
        },
        async addToCart(productId, quantity = 1) {
            const { data } = await api.post('/cart', { product_id: productId, quantity })
            this.items = data.items
            this.subtotal = data.subtotal
            this.count = data.count
        },
        async updateItem(itemId, quantity) {
            const { data } = await api.patch(`/cart/${itemId}`, { quantity })
            this.items = data.items
            this.subtotal = data.subtotal
            this.count = data.count
        },
        async removeItem(itemId) {
            const { data } = await api.delete(`/cart/${itemId}`)
            this.items = data.items
            this.subtotal = data.subtotal
            this.count = data.count
        },
    },
})
