<template>
    <div>
      <header-component></header-component>
      <search-template></search-template>
      <footer-component></footer-component>
    </div>
</template>
<script>
import FooterComponent from '../content/FooterComponent.vue';
import HeaderComponent from '../content/HeaderComponent.vue';
import SearchTemplate from '../content/SearchPageComponents/SearchTemplate.vue';
export default {
  components: { HeaderComponent, SearchTemplate, FooterComponent },
}
</script>