<template>
    <div class="home-page">
      <header-component></header-component>
      <home-banner></home-banner>
      <category-component></category-component>
      <featured-component></featured-component>
      <service-component></service-component>
      <contact-component></contact-component>
      <footer-component></footer-component>
    </div>
</template>
<script>
import CategoryComponent from '../content/HomePageComponent/CategoryComponent.vue';
import ContactComponent from '../content/HomePageComponent/ContactComponent.vue';
import FeaturedComponent from '../content/HomePageComponent/FeaturedComponent.vue';
import HeaderComponent from '../content/HeaderComponent.vue';
import HomeBanner from '../content/HomePageComponent/HomeBanner.vue';
import ServiceComponent from '../content/HomePageComponent/ServiceComponent.vue';
import FooterComponent from '../content/FooterComponent.vue';
export default {
  components: { CategoryComponent, HeaderComponent, FeaturedComponent, HomeBanner, ServiceComponent, ContactComponent, FooterComponent },
  data() {
    return {
      isCarousalContainerReq: true,
    }
  }
    
}
</script>

<style lang="scss" scoped>
.home-page{
  background-color: $white;
}
</style>