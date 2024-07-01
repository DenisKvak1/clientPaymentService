import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import PaymentPage from '@/pages/PaymentPage.vue';
import NotFound from '@/pages/NotFound.vue';
import AwaitConfirmPage from '@/pages/AwaitConfirmPage.vue';
import FinishPage from '@/pages/FinishPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: NotFound,
    },
    {
        path: '/:id',
        name: 'paymentPage',
        component: PaymentPage
    },
    {
        path: '/awaitConfirm/:id',
        name: 'awaitConfirm',
        component: AwaitConfirmPage
    },
    {
        path: '/finished/:id',
        name: 'finishPage',
        component: FinishPage
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
