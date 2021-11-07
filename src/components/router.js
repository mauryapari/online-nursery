import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from './pages/HomePage.vue';
import AccountPage from './pages/AccountPage.vue';

const router = new VueRouter({
    routes: [
        { path:'/', component: HomePage },
        { path: '/account', component: AccountPage }
        // beforeEnter: (to, enter, next)=> {
        //     if(true) {
        //         next('/account');
        //     } else {
        //         next();
        //     }
        // }}
    ]
});

export default router;