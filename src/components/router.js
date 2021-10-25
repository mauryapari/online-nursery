import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from './pages/HomePage.vue';
const router = new VueRouter({
    routes: [
        { path:'/', component: HomePage }
    ]
});

export default router;