<template>
    <div>
      <header-component></header-component>
      <search-template></search-template>
    </div>
</template>
<script>
import HeaderComponent from '../content/HeaderComponent.vue';
import SearchTemplate from '../content/SearchPageComponents/SearchTemplate.vue';
export default {
  components: { HeaderComponent, SearchTemplate },
}
</script>