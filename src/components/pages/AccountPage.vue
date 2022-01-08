<template>
    <div>
      <header-component></header-component>
      <footer-component></footer-component>
    </div>
</template>
<script>
import FooterComponent from '../content/FooterComponent.vue';
import HeaderComponent from '../content/HeaderComponent.vue';
export default {
  components: { HeaderComponent, FooterComponent },
}
</script>