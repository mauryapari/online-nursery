<template>
   <div class="checkout-address">
      <div class="checkout-address__icon-container accordian-container__icon-container">
         <span class="icon icon-shopping-bag"></span>
      </div>   
      <section-component>
         <template slot="page-content">
            <div class="accordian-container__placeholder-text" v-if="!isAddressFilled">Delivery Address</div>
            <div class="checkout-address__address-step" v-else>
               <div class="checkout-address__header">
                  Delivery Adddress
               </div>
               <div class="checkout-address__body">
                  
               </div>
            </div>  
         </template>
      </section-component>
   </div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue'
export default {
  components: { SectionComponent },
   
}
</script>

<style lang="scss" scoped>
.checkout-address {
   position: relative;
   margin-left: 30px;
   margin-bottom: 20px;
}
</style>