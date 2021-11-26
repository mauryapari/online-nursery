<template>
    <div class="service-section container" ref="services">
        <section-header headingName="Services"></section-header>
        <div class="service-section__card-wrapper">
            <template v-for="(item, index) in itemArray">
                <div :key="index" class="service-section__card-container">
                    <card-container :isFooter="true" :showHoverEffect="true">
                        <template slot="card-image">
                            <div class="service-section__img-wrapper">
                                <img :src="item.src" :alt="item.alt" class="service-section__card-img"/>
                            </div>
                        </template>    
                        <template slot="card-text">
                            <p v-html="item.title" class="service-section__card-title"></p>    
                        </template>    
                        <template slot="card-description">
                            <p v-html="item.desc" class="service-section__card-desc"></p>
                        </template>
                        <template slot="card-footer">
                            <div class="service-section__card-footer">
                                <clickables :btnSize="'md'">{{'Enquire Now'}}</clickables>
                            </div>
                        </template>    
                    </card-container>    
                </div>    
            </template>
        </div>
    </div>
</template>

<script>
import CardContainer from '../util-content/card-container/CardContainer.vue'
import Clickables from '../util-content/clickables/clickables.vue'
import SectionHeader from '../util-content/section-header/SectionHeader.vue'
export default {
  components: { SectionHeader, CardContainer, Clickables },
  data() {
      return {
          itemArray: [{
              src: require('../../resources/img/EE18C1762EF1C80477C11C7B14_1591705054429.webp'),
              alt: "img1",
              title: "Plant Supplying Services",
              desc: "Our skilled and experienced team offers a wide range of plants and saplings to our reputed clients as per their requirements and at affordable rates."
          }, {
              src: require('../../resources/img/flowers.webp'),
              alt: "img1",
              title: "Nursery Services",
              desc: 'Looking for beautiful landscape ideas? Count on our plants, garden flowers to be healthy and thriving. We bring you stunning examples of garden design from properties around the world.'
          }, {
              src: require('../../resources/img/plant-path.webp'),
              alt: "img1",
              title: "Landscape Design",
              desc: 'Using the vast industrial knowledge, which we have amassed over the years, we constantly provide various nursery services to our clients as and when requested.'
          }, {
              src: require('../../resources/img/bush.webp'),
              alt: "img1",
              title: "Garden Maintenance",
              desc: 'Create the perfect background for your life to happen with the perfect selection of houseplants, home decor, home fragrance and gift items for everyone you know.'
          }]
      }
  }
}
</script>

<style lang="scss" scoped>
.service-section {
    padding-top: 40px;
    padding-bottom: 40px;
    @include element(card-wrapper) {
        display: flex;
        flex-flow: wrap;
    }

    @include element(card-container) {
        flex-basis: 100%;
        position: relative;
        min-height: 300px;
    }

    @include element(img-wrapper) {
        padding: 20px;
        width: 250px;
        height: 250px;
        margin-right: auto;
        margin-left: auto;
    }

    @include element(card-img) {
        max-width: 100%;
        border-radius: 50%;
    }

    @include element(card-title) {
        font-size: 20px;
        line-height: 1.5;
        margin-bottom: 10px;
        font-weight: 500;
        color: $brand-grey-600;
        text-align: center;
    }

    @include element(card-desc) {
        line-height: 1.5;
        color: $brand-grey-700;
        margin-top: 10px;
        margin-bottom: 10px;
        min-height: 100px;
        padding: 10px 0px;
        text-align: center;
    }

    @include element(card-footer) {
        width: 100%;
        text-align: center;
    }

    @include sm {
        @include element(card-container) {
            flex-basis: 50%;
            min-height: 500px;
        }
    }
    @include lg {
        @include element(card-container) {
            flex-basis: 25%;
            padding-bottom: 30px;
        }
          @include element(card-desc) {
            min-height: 180px;
        }
    }
}
</style>