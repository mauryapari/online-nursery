<template>
    <div class="featured-section container section-padding" ref="products">
        <section-header headingName="Featured"></section-header>
        <div class="featured-section__carousel-wrapper">
          <div class="featured-section__card-wrapper" ref="featured-cards">
            <template v-for="(item, index) in itemArray">
                <div :key="index" class="featured-section__card-container">
                    <router-link to="/plant">
                      <card-container>
                          <template slot="card-image">
                              <img :src="item.img" :alt="item.alt" class="featured-section__card-img"/>
                          </template>
                          <template slot="card-text">
                              <h4 v-html="item.name" class="featured-section__card-title"></h4>
                          </template>
                          <template slot="card-description">
                              <p v-html="item.price" class="featured-section__card-price"></p>
                          </template>
                      </card-container>
                    </router-link>
                </div>
            </template>  
          </div>
        </div>
    </div>
</template>

<script>
import SectionHeader from '../../util-content/section-header/SectionHeader.vue'
import CardContainer from '../../util-content/card-container/CardContainer.vue';
export default {
  components: { SectionHeader, CardContainer },
  data() {
    return {
      itemArray: [{
        img: require('../../../resources/img/Beautiful-Yellow-Daffodils_1499169127126.jpg'),
        alt:"img 1",
        name: 'Beautiful Yellow Daffodils',
        price: '870'
      }, {
        img: require('../../../resources/img/Campanula-Flowers-Plants_1499169413504.jpg'),
        alt:"img 2",
        name: 'Campula Flower Plant',
        price: '999'
      }, {
        img: require('../../../resources/img/young-Schefflera-Plant_1499169220643.jpg'),
        alt:"img 3",
        name: 'Young Schefflera Plant',
        price: '270'
      }, {
        img: require('../../../resources/img/Madagascar-Periwinkle-Flower-Plant_1499169348075.jpg'),
        alt:"img 4",
        name: 'Madagascar Periwinkle Flower Plant',
        price: '450'
      }, {
        img: require('../../../resources/img/Petunia-Flowering-Plant_1499169561997.jpg'),
        alt:"img 5",
        name: 'Petunia Flowring Plant',
        price: '820'
      }],
      currentIndex: 0
    }
  }, 
}
</script>

<style lang="scss" scoped>
.featured-section {
  @include element(carousel-wrapper) {
    overflow: hidden;
  }

  @include element(card-wrapper) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  @include element(card-container) {
    width: 250px;
    padding: 15px;
    flex-basis: 50%;
    text-align: center;
  }

  @include element(card-title) {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }

  @include element(card-price) {
    font-size: 20px;
    font-weight: 500;
  }

  @include sm {
    @include element(card-container) {
      flex-basis: 30%;
    } 
  }

  @include md {
    @include element(card-container) {
      flex-basis: 20%;
      text-align: left;
    }
    @include element(card-wrapper) {
      justify-content: space-between;
    }
  }
}
</style>