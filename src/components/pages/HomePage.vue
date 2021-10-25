<template>
    <div>
      <header-component></header-component>
      <carousel :isContainerReq="true" :isBanner="true"></carousel>
      <category-component></category-component>
      <featured-component></featured-component>
    </div>
</template>
<script>
import CategoryComponent from '../content/CategoryComponent.vue'
import FeaturedComponent from '../content/FeaturedComponent.vue'
import HeaderComponent from '../content/HeaderComponent.vue'
import Carousel from '../util-content/carousel/Carousel.vue'
export default {
  components: { CategoryComponent, HeaderComponent, FeaturedComponent, Carousel },
  data() {
    return {
      isCarousalContainerReq: true,
    }
  }
    
}
</script>