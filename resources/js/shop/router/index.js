import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    { path: '/products', name: 'products', component: () => import('../pages/ProductsPage.vue') },
    { path: '/products/:slug', name: 'product', component: () => import('../pages/ProductPage.vue') },
    { path: '/cart', name: 'cart', component: () => import('../pages/CartPage.vue') },
    { path: '/checkout', name: 'checkout', component: () => import('../pages/CheckoutPage.vue'), meta: { auth: true } },
    { path: '/orders', name: 'orders', component: () => import('../pages/OrdersPage.vue'), meta: { auth: true } },
    { path: '/wishlist', name: 'wishlist', component: () => import('../pages/WishlistPage.vue'), meta: { auth: true } },
    { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue'), meta: { guest: true } },
    { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue'), meta: { guest: true } },
    { path: '/admin', name: 'admin', component: () => import('../pages/AdminPage.vue'), meta: { admin: true } },
]

const router = createRouter({
    history: createWebHistory('/shop'),
    routes,
    scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()

    if (!auth.loaded) {
        await auth.fetchUser()
    }

    if (to.meta.auth && !auth.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }

    if (to.meta.admin && !auth.isAdmin) {
        return { name: 'home' }
    }

    if (to.meta.guest && auth.isAuthenticated) {
        return { name: 'home' }
    }
})

export default router
