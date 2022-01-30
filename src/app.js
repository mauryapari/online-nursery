import Vue from 'vue';
import router from './components/router';
import store from './components/stores/index'
import App from './App.vue';
new Vue({
  el: '#app',
  router: router,
  store: store,
  mounted() {
    this.$store.dispatch('setWinDimensions');
    window.addEventListener('resize', () => {
        this.$store.dispatch('setWinDimensions');
    });
  },
  render: h => h(App)
})
