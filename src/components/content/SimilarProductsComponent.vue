<template>
  <section-component v-if="getRandomProducts.length" :showContainer="true">
    <template slot="page-content">
      <div class="similar-products">
        <div class="similar-products__heading">
          <h2>Similar Products</h2>
        </div>
        <div class="similar-products__wrapper">
          <div
            class="similar-products__product"
            v-for="(item, index) in getRandomProducts"
            :key="index">
            <router-link :to="{ name: 'plant', params: { id: `${item.variantId}` }}" @click.native="setNewPlantData(item)">
              <card-container :showHoverEffect="true">
                <template slot="card-image">
                  <div class="similar-products__img-wrapper">
                    <img
                      :src="item.imgpath"
                      :alt="item.itemname"
                      class="similar-products__card-img"
                    />
                  </div>
                </template>
                <template slot="card-text">
                  <p
                    v-html="item.itemname"
                    class="similar-products__card-title"
                  ></p>
                </template>
                <template slot="card-description">
                  <p
                    v-html="item && item.offerprice && item.offerprice[0]"
                    class="similar-products__card-desc"
                  ></p>
                </template>
              </card-container>
            </router-link>
            <div class="search-results__wishlist-wrapper"></div>
          </div>
        </div>
      </div>
    </template>
  </section-component>
</template>

<script>
const plantData = window?.globalFun?.plantData;
import CardContainer from "../util-content/card-container/CardContainer.vue";
import SectionComponent from "../util-content/page-background/SectionComponent.vue";

export default {
  components: { CardContainer, SectionComponent },
  computed: {
    getRandomProducts() {
      const num = window.globalFun.util.getRandomNum(plantData.length);
      const prodArray = plantData.slice(num, num + 4);
      return prodArray;
    },
  },
  methods: {
     setNewPlantData(data) {
        this.$store.dispatch('setPlantDetail', data);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
     }
  }
};
</script>

<style lang="scss" scoped>
.similar-products {
  padding: 15px;
  @include element(wrapper) {
    display: flex;
    flex-flow: wrap;
  }

  @include element(heading) {
    h2 {
      font-size: 22px;
      margin-bottom: 30px;
      font-weight: 500;
    }
  }

  @include element(product) {
    flex-basis: 100%;
  }

  .card-container {
    &:hover {
      @include element(img-wrapper) {
        img {
          width: 120%;
        }
      }
    }
  }

  @include element(img-wrapper) {
    min-height: 225px;
    text-align: center;
    padding: 10px;
  }

  @include element(card-img) {
    max-width: 100%;
  }

  @include element(card-title) {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 10px;
    font-weight: 400;
    color: $brand-grey-700;
  }

  @include element(card-desc) {
    line-height: 1.5;
    color: $brand-grey-700;
    margin-top: 10px;
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