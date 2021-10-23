<template>
    <div class="categories-section">
        <section-header headingName="Categories"></section-header>
        <div class="categories-section__cards-wrapper">
            <template v-for="item in itemArray">
                <div :key="item.id" class="categories-section__card-container">
                    <card-container>
                        <template slot="card-image">{{item.img}}</template>
                        <template slot="card-text">{{item.title}}</template>
                        <template slot="card-description">{{item.description}}</template>
                    </card-container>
                </div>
            </template>    
        </div>
    </div>
</template>

<script>
import SectionHeader from '../util-content/section-header/SectionHeader.vue';
import CardContainer from '../util-content/card-container/CardContainer.vue';
export default {
  components: { SectionHeader, CardContainer },
  data() {
      return {
          itemArray: [{
              id: 1,
              img: '',
              title: 'Cactus & Succulents',
              description: 'Buy the largest collection of cactus and succulents plants online. Our cactus and succulent plants are a true delight for the cactus plants c collectors.'
          }, {
              id: 2,
              img: '',
              title: 'Cactus & Succulents',
              description: 'Buy the largest collection of cactus and succulents plants online. Our cactus and succulent plants are a true delight for the cactus plants c collectors.'
          }, {
              id:3,
              img: '',
              title: 'Cactus & Succulents',
              description: 'Buy the largest collection of cactus and succulents plants online. Our cactus and succulent plants are a true delight for the cactus plants c collectors.'
          }, {
              id:4,
              img: '',
              title: 'Cactus & Succulents',
              description: 'Buy the largest collection of cactus and succulents plants online. Our cactus and succulent plants are a true delight for the cactus plants c collectors.'
          }]
      }
  }
}
</script>

<style lang="scss" scoped>
.categories-section {
    @include element(cards-wrapper) {
        display: flex;
        justify-content: space-between;
    }
    @include element(card-container) {
        flex-basis: 25%;
    }
}
</style>