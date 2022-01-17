<template>
    <div class="categories-section container section-padding" ref="categories">
        <section-header headingName="Categories"></section-header>
        <div class="categories-section__cards-wrapper">
            <template v-for="item in itemArray">
                <div :key="item.id" class="categories-section__card-container">
                    <card-container>
                        <template slot="card-image">
                            <img :src="item.img" :alt="item.alt" class="categories-section__card-img"/>
                        </template>
                        <template slot="card-text">
                            <h4 v-html="item.title" class="categories-section__card-title"></h4>
                        </template>
                        <template slot="card-description">
                            <p v-html="item.description" class="categories-section__card-desc"></p>
                        </template>
                    </card-container>
                </div>
            </template>    
        </div>
    </div>
</template>

<script>
import SectionHeader from '../../util-content/section-header/SectionHeader.vue';
import CardContainer from '../../util-content/card-container/CardContainer.vue';
export default {
  components: { SectionHeader, CardContainer },
  data() {
      return {
          itemArray: [{
              id: 1,
              img: require("../../../resources/img/cactus.webp"),
              alt: 'Cactus Plants',
              title: 'Cactus & Succulents',
              description: 'Buy the largest collection of cactus and succulents plants online. Our cactus and succulent plants are a true delight for the cactus plants c collectors.'
          }, {
              id: 2,
              img: require("../../../resources/img/bonsai.webp"),
              alt: 'Bonsai-Plants',
              title: 'Bonsai Plants',
              description: 'Browse from a wide variety of bonsai plants which purify the air around you and creates a positive environment.'
          }, {
              id:3,
              img: require('../../../resources/img/flowering-plant.jfif'),
              alt: 'Flowering and gardening plants',
              title: 'Flowering Plants',
              description: 'Buy flowering plants, largest online nursery for flowering plants including all flowering plants, lilies n bulbous plants, orchids, plumeria plants.'
          }, {
              id:4,
              img: require('../../../resources/img/cliembers.webp'),
              alt: 'Cliembers Plant',
              title: 'Climbers & Creepers',
              description: 'Opt for climbing plants as they add color to dull fences, walls or trellises, we are offering online services for buying climbers and creeper plants.'
          }]
      }
  }
}
</script>

<style lang="scss">
.categories-section {
    @include element(cards-wrapper) {
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
    }
    @include element(card-container) {
        margin: 20px 0px;
        flex-basis: 100%;
    }
    @include element(card-img) {
        width: 100%;
    }
    @include element(card-title) {
        font-size: 22px;
        color: $brand-grey-600;
        line-height: 1.4;
        font-weight: 500;
        margin-bottom: 10px;
        text-align: center;
    }
    @include element(card-desc) {
        color: $brand-grey-700;
        font-size: 18px;
        line-height: 1.5;
        text-align: center;
    }
    .card-container {
        @include element(img-wrapper) {
            width: 250px;
            height: 250px;
            margin-left: auto;
            margin-right: auto;
        }
    }
    @include sm {
        @include element(card-container) {
            padding: 0px 15px;
            flex-basis: 50%;
        }
    }

    @include lg {
        @include element(card-container) {
            margin: 0px;
            flex-basis: 25%;
        }
    }
}
</style>