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
          }
      }
    };
</script>
