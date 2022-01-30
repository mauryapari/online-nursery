<template>
   <div class="checkout-step">
      <div class="checkout-step__icon-container accordian-container__icon-container">
         <span class="icon icon-calendar"></span>
      </div>   
      <section-component>
         <template slot="page-content">
            <div class="accordian-container__placeholder-text" v-if="!getDeliveryStatus">Delivery Status</div>
            <div class="checkout-step__content" v-else>
               <div class="checkout-step__header">
                  <div class="checkout-step__heading">
                     Delivery Status
                  </div>
               </div>
               <div class="checkout-step__body">
                  <div class="checkout-step__delivery-date-time">
                     <div class="checkout-step__delivery-date">
                        28 Dec' 21 , Wednesday
                     </div>
                     <div class="checkout-step__delivery-time">
                        7:15 PM
                     </div>
                  </div>
               </div>
            </div>  
         </template>
      </section-component>
   </div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import clickables from '../../util-content/clickables/clickables.vue';

export default {
  components: { SectionComponent, InputComponent, clickables },
  computed: {
     getDeliveryStatus() {
        return this.$store?.getters?.getDeliveryStatus;
     }
  },
  watch: {
     getDeliveryStatus() {
        this.$store.dispatch('showReviewStatus', true);
     }
  }
}
</script>