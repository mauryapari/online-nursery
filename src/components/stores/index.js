import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from './globalStore';
import PlantPdpStore from './plantPdpStore';
import CartStore from './cartStore';
import UtilStore from './utilStore';
import AuthStore from './authStore';
Vue.use(Vuex);

const storeModules = {
    globalStore,
    PlantPdpStore,
    CartStore,
    UtilStore,
    AuthStore
};

const vueXStore = new Vuex.Store({
    modules: storeModules
});

export default vueXStore;
