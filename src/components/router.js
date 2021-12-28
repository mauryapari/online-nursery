import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from './pages/HomePage.vue';
import AccountPage from './pages/AccountPage.vue';
import PlantPage from './pages/SearchPage.vue';
import PlantPdpPage from './pages/Plant.vue';
import CartPage from './pages/Cart.vue';
import CheckoutPage from './pages/CheckoutPage.vue';
import store from '../components/stores/index';

const router = new VueRouter({
    routes: [
        { path:'/', component: HomePage },
        { path: '/account', component: AccountPage },
        { path: '/plant', component: PlantPage },
        {   path: '/plant/:id',
            name:'plant',
            component: PlantPdpPage
        },
        { path: '/cart', component:  CartPage },
        { path:'/checkout', component: CheckoutPage, beforeEnter: (to, from, next)=> {
            if(!store.getters.getUserLoggedIn) {
                store.dispatch('setModalName', 'login-form');
                next(false);
            } else {
                next();
            }
        }},
    ]
});

export default router;