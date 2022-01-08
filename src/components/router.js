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
        { path:'/', component: HomePage, meta: { breadcrumb: [{ name: 'Home' }]} },
        { path: '/account', component: AccountPage, meta: { breadcrumb: [{ name: 'Home', link: '/' }, { name:'Account' }]} },
        { path: '/plant', component: PlantPage, meta: { breadcrumb: [{ name: 'Home', link:'/' }, { name: 'Plants' }]} },
        {   path: '/plant/:id',
            name:'plant',
            component: PlantPdpPage,
            meta: { 
                breadcrumb: [{ 
                    name: 'Home',
                    link: '/'
                }, {
                    name: 'Plants',
                    link: '/plant'
                }]}
        },
        { path: '/cart', component: CartPage },
        { path:'/checkout', component: CheckoutPage, beforeEnter: (to, from, next)=> {
            if(store?.getters?.getUserLoggedIn === null) {
                const watcher = store.watch(() => store.getters.getUserLoggedIn, isLoggedIn => {
                    watcher();
                    if (isLoggedIn) next();
                    else {
                        store.dispatch('setModalName', 'login-form');
                        next(false);
                    }
                });
            }
            else if(!store.getters.getUserLoggedIn) {
                store.dispatch('setModalName', 'login-form');
                next(false);
            } else {
                next();
            }
        }},
    ]
});

export default router;