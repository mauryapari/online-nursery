<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <empty-card-component 
            :imgSrc="imgSrc"
            :altText="'Empty Cart'"
            :heading="'Your Cart is Empty'"
            :subHeading="'Looks Like You haven\'t made Your Choice Yet'">
         </empty-card-component>
      </template>
   </section-component>
</template>

<script>
import EmptyCardComponent from '../EmptyCardComponent.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
   components: { SectionComponent, EmptyCardComponent },
   data() {
      return {
         imgSrc: require('../../../resources/img/cart-icon.webp')
      }
   }
}
</script>