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
          <card-container :showHoverEffect="true">
            <template slot="card-image">
              <div class="search-results__img-wrapper">
                <img
                  :src="item.imgpath"
                  :alt="item.itemname"
                  class="search-results__card-img"/>
              </div>
            </template>
            <template slot="card-text">
              <p
                v-html="item.itemname"
                class="search-results__card-title"
              ></p>
            </template>
            <template slot="card-description">
              <p v-html="item && item.offerprice && item.offerprice[0]"
                class="search-results__card-desc"></p>
            </template>
          </card-container>
        </router-link>
        <div class="search-results__wishlist-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CardContainer from '../../util-content/card-container/CardContainer.vue';
const plantsData = window?.globalFun?.plantData; 
export default {
  components: { CardContainer },
  data() {
    return {
      plantArray: plantsData,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-results{
    padding: 10px;
    
    @include element(header-container) {
      border-bottom: 1px solid $brand-grey-200;
      padding: 10px 0px;
    }

    @include element(header-title) {
      font-size: 20px;
      font-weight: 400;
    }

    @include element(product-listings) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    @include element(product) {
      flex-basis: 100%;
      margin: 10px 0px;
    }

    @include element(img-wrapper) {
      border: 1px solid $brand-grey-200;
      margin-bottom: 20px;
      text-align: center;
    }

    @include element(card-title) {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4;
    }

    @include element(card-desc) {
      font-size: 20px;
      font-weight: 500;
    }

    @include sm {
      @include element(product) {
        flex-basis: 50%;
      }
    }

    @include lg {
      @include element(product) {
        flex-basis: 25%;
      }
    }
}
</style>
