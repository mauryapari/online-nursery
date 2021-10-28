<template>
    <div>
      <header-component></header-component>
      <home-banner></home-banner>
      <category-component></category-component>
      <featured-component></featured-component>
      <service-component></service-component>
    </div>
</template>
<script>
import CategoryComponent from '../content/CategoryComponent.vue'
import FeaturedComponent from '../content/FeaturedComponent.vue'
import HeaderComponent from '../content/HeaderComponent.vue'
import HomeBanner from '../content/HomeBanner.vue'
import ServiceComponent from '../content/ServiceComponent.vue'
export default {
  components: { CategoryComponent, HeaderComponent, FeaturedComponent, HomeBanner, ServiceComponent },
  data() {
    return {
      isCarousalContainerReq: true,
    }
  }
    
}
</script>