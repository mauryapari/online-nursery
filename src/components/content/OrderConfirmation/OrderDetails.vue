<template>
<div class="order-page">
   <section-component>
      <template slot="page-content">
         <div class="order-page__content order-page__content--has-spinner" v-if="!userAddress">
            <spinner :size="'lg'"></spinner>
         </div>
         <div class="order-page__content order-page__content--col" v-else>
            <div class="order-page__data-point">
               <div class="order-page__icon-container">
                  <span class="icon icon-twitter"></span>
               </div>
               <div class="order-page__details-container">
                  <div class="order-page__details-header">Delivery Address</div>
                  <div class="order-page__delivery-method">Home Delivery</div>
                  <div class="order-page__user-name"><p v-html="userAddress && userAddress.name"></p></div>
                  <div class="order-page__user-address">{{userAddress.flat}} {{userAddress.street}} {{userAddress.town}} {{userAddress.pincode}} {{userAddress.state}}</div>
               </div>
            </div>
            <div class="order-page__data-point">
               <div class="order-page__icon-container">
                  <span class="icon icon-twitter"></span>
               </div>
               <div class="order-page__details-container">
                  <div class="order-page__details-header">Delivery Schedule</div>
                  <div class="order-page__delivery-date">
                        28 Dec' 21 , Wednesday
                     </div>
                     <div class="order-page__delivery-time">
                        7:15 PM
                     </div>
               </div>
            </div>
            <div class="order-page__data-point">
               <div class="order-page__icon-container">
                  <span class="icon icon-twitter"></span>
               </div>
               <div class="order-page__details-container">
                  <div class="order-page__details-header">Payment Method</div>
                  <p>Cash On Delivery</p>
               </div>
            </div>
         </div>  
      </template>
   </section-component>
</div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import Spinner from '../../util-content/spinner/spinner.vue';
export default {
   components: { SectionComponent, Spinner },
   computed: {
      userAddress() {
        return this.$store?.getters?.getUserAddress;
     }
   }
}
</script>
