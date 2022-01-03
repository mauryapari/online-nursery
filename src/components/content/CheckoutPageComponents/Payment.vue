<template>
   <div class="checkout-step">
      <div class="checkout-step__icon-container accordian-container__icon-container">
         <span class="icon icon-shopping-bag"></span>
      </div>   
      <section-component>
         <template slot="page-content">
            <div class="accordian-container__placeholder-text" v-if="!showPayment">Make Payment</div>
            <div class="checkout-step__content" v-else>
               <div class="checkout-step__header">
                  <div class="checkout-step__heading">
                     Make Payment
                  </div>
               </div>
               <div class="checkout-step__payment-body">
                  <div class="checkout-step__payment-options">
                     <div class="checkout-step__payment-method">Cash On Delivery</div>
                  </div>
                  <div class="checkout-step__payment-description">
                     <card-component :hasFooter="true">
                        <template slot="card-image">
                           <img class="checkout-step__payment-image" src="../../../resources/img/payment.svg" alt="Payment Logo"/>
                        </template>
                        <template slot="card-text">
                           <div class="checkout-step__payment-card-text">
                              Please pay to the delivery executive when your order is delivered
                           </div>
                        </template>
                        <template slot="card-footer">
                           <clickables :isDisabled="isBtnDisabled" :btnType="'secondary'" @click.native="submitOrder">{{'CONFIRM ORDER'}}</clickables>
                        </template>
                     </card-component>
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
import CardComponent from '../../util-content/card-container/CardContainer.vue';

export default {
  components: { SectionComponent, InputComponent, clickables, CardComponent },
  computed: {
     showPayment() {
        return this.$store?.getters?.getShowPayment;
     }
  },
  watch: {
     getDeliveryStatus() {
        this.$store.dispatch('showReviewStatus');
     }
  },
  methods: {
     submitOrder() {
      this.$store.dispatch('setOrder');  
     }
  }
}
</script>