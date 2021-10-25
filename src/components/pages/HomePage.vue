<template>
    <div>
      <header-component></header-component>
      <category-component></category-component>
      <featured-component></featured-component>
    </div>
</template>
<script>
import CategoryComponent from '../content/CategoryComponent.vue'
import FeaturedComponent from '../content/FeaturedComponent.vue'
import HeaderComponent from '../content/HeaderComponent.vue'
export default {
  components: { CategoryComponent, HeaderComponent, FeaturedComponent },
    
}
</script>