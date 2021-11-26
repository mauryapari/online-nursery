<template>
  <div class="search-results">
    <div class="search-results__header-container">
      <div class="search-results__header-title">Plants</div>
    </div>
    <div class="search-results__product-listings">
      <div
        class="search-results__product"
        v-for="(item, index) in plantArray"
        :key="index">
        <router-link :to="{ name: 'plant', params: {id:`${item.variantId}`} }">
          <div class="search-results__product-details">
            <div class="search-results__product-image">
              <img :src="item.imgpath" :alt="item.itemname"/>
            </div>
            <div class="search-results__product-desc">
              <p>{{ item.itemname }}</p>
              <p class="search-result__price">{{ item.offerprice }}</p>
            </div>
          </div>
        </router-link>
        <div class="search-results__wishlist-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
const plantsData = window?.globalFun?.plantData; 
export default {
  data() {
    return {
      plantArray: plantsData,
    };
  },
};
</script>
