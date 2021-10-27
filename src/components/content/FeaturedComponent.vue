<template>
    <div class="featured-section container section-padding" ref="products">
        <section-header headingName="Featured"></section-header>
        <div class="featured-section__carousel-wrapper">
          <carousel :isContainerReq="true" 
            @prev="prev" @next="next">
            <template>
              <div class="featured-section__card-wrapper" ref="featured-cards">
                <template v-for="(item, index) in itemArray">
                    <div :key="index" class="featured-section__card-container">
                        <card-container>
                            <template slot="card-image">
                                <img :src="item.img" :alt="item.alt" class="featured-section__card-img"/>
                            </template>
                            <template slot="card-text">
                                <p v-html="item.name" class="featured-section__card-title"></p>
                            </template>
                            <template slot="card-description">
                                <p v-html="item.price" class="featured-section__card-price"></p>
                            </template>
                        </card-container>
                    </div>
                </template>  
              </div>
            </template>
          </carousel>
        </div>
    </div>
</template>

<script>
import SectionHeader from '../util-content/section-header/SectionHeader.vue'
import Carousel from '../util-content/carousel/Carousel.vue';
import CardContainer from '../util-content/card-container/CardContainer.vue';
export default {
  components: { SectionHeader, Carousel, CardContainer },
  data() {
    return {
      itemArray: [{
        img: require('../../resources/img/Beautiful-Yellow-Daffodils_1499169127126.jpg'),
        name: 'Beautiful Yellow Daffodils',
        price: '870'
      }, {
        img: require('../../resources/img/Campanula-Flowers-Plants_1499169413504.jpg'),
        name: 'Campula Flower Plant',
        price: '870'
      }, {
        img: require('../../resources/img/young-Schefflera-Plant_1499169220643.jpg'),
        name: 'Young Schefflera Plant',
        price: '870'
      }, {
        img: require('../../resources/img/Madagascar-Periwinkle-Flower-Plant_1499169348075.jpg'),
        name: 'Madagascar Periwinkle Flower Plant',
        price: '870'
      }, {
        img: require('../../resources/img/Petunia-Flowering-Plant_1499169561997.jpg'),
        name: 'Petunia Flowring Plant',
        price: '870'
      }, {
        img: require('../../resources/img/Snake-Plant_1499169649515.jpg'),
        name: 'Snake Plant',
        price: '870'
      }],
      card_index: 1
    }
  }, 
  mounted() {
    this.displayBanner(5);
  },
  methods: {
    displayBanner(n) {
        var slides = this.$refs['featured-cards'].children;
      
        console.log(slides);
        for (let i=0; i<n; i++) {
            slides[i].classList.add('display');
        }
        for (let i=n; i<slides.length; i++) {
            slides[i].classList.add('hide');
        }
    },
    prev() {
      console.log('prev runnning');
    },
    next() {
      const slides = this.$refs['featured-cards'].children;
      let firstEle = null;
      let nextEle = null ;
      for(let item of slides) {
        if(item.classList.contains('display')) {
          firstEle = item;
          break;
        }
      }
      for(let item of slides) {
        if(item.classList.contains('hide')) {
          nextEle = item;
          break;
        }
      }
      console.log(firstEle, nextEle);
      firstEle.classList.remove('display');
      firstEle.classList.add('hide');
      nextEle.classList.add('display');
      nextEle.classList.remove('hide');
      
    }
  }  
}
</script>

<style lang="scss" scoped>
.featured-section {
  @include element(carousel-wrapper) {
    overflow: hidden;
  }

  @include element(card-wrapper) {
    width: 2000px;
    display: flex;
    align-items: center;
  }

  @include element(card-container) {
    width: 250px;
    padding: 15px;
  }

  .card-container{
    @include element(img-wrapper) {
      img {
        max-width: 100%;
      }
    }
  }

}
</style>