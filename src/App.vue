<template>
    <div>
        <router-view></router-view>
        <component :is="getModalName" v-if="getModalName"></component>
    </div>
</template>
<script>
import HomePage from './components/pages/HomePage.vue';
import SigninForm from './components/content/Forms/SigninForm.vue';
import LoginForm from './components/content/Forms/LoginForm.vue';
    export default {
      components: {
            HomePage, SigninForm, LoginForm
      },
      computed: {
          getModalName() {
              return this.$store?.getters?.getModalName;
          },
          getUserCartID() {
            return this.$store?.getters?.getUserCartID;
          }
      },
      watch: {
          getUserCartID: {
              immediate: true,
              handler() {
                this.$store.dispatch('isCartAvailable');
              }
          }
      },
      mounted() {
          this.$store.dispatch('isUserRegistered');
      }
    };
</script>
