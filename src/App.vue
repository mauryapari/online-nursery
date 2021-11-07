<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
import HomePage from './components/pages/HomePage.vue';
    export default {
      components: {
            HomePage,
      },
    };
</script>
