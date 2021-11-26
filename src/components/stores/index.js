import Vue from 'vue';
import Vuex from 'vuex';
import globalStore from './globalStore';
import PlantPdpStore from './plantPdpStore';

Vue.use(Vuex);

const storeModules = {
    globalStore,
    PlantPdpStore
};

const vueXStore = new Vuex.Store({
    modules: storeModules
});

export default vueXStore;
