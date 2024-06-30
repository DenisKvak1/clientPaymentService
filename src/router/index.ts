import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import PaymentPage from '@/pages/PaymentPage.vue';
import NotFound from '@/pages/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: MainPage,
    },
    {
        path: '/:id',
        name: 'paymentPage',
        component: PaymentPage
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: NotFound
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
