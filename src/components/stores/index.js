import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from './globalStore';

Vue.use(Vuex);

const storeModules = {
    globalStore,
};

const vueXStore = new Vuex.Store({
    modules: storeModules
});

export default vueXStore;
