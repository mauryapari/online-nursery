<template>
   <section-component>
      <template slot="page-content">
         <div class="invoice-container">
            <div class="invoice-container__details">
               <div class="invoice-container__details-item">
                  <div class="invoice-container__text">Item(s) Total</div>
                  <div class="invoice-container__cost">2300</div>
               </div>
               <div class="invoice-container__details-item">
                  <div class="invoice-container__text">Account Payable</div>
                  <div class="invoice-container__cost">2300</div>
               </div>
            </div>
            <clickables v-if="isCart" class="invoice-container__btn" :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="'#/checkout'">{{'Checkout'}}</clickables>
         </div>
      </template>
   </section-component>
</template>

<script>
import Clickables from '../../util-content/clickables/clickables.vue';
import SectionComponent  from '../../util-content/page-background/SectionComponent.vue';
export default {
   props: {
      isCart: {
         type: Boolean,
         default: false
      }
   },
   components: { SectionComponent, Clickables },
   computed: {
      getCartData() {
         return this.$store?.getters.getCartData;
      }
   }
}
</script>

<style lang="scss" scoped>
.invoice-container {
   padding: 20px 15px;
   margin-top: 40px;

   .item-clickable {
      margin-top: 20px;
      width: 100%;
   }

   @include element(details-item) {
      display: flex;
      justify-content: space-between;
      padding: 7px 0px;
   }

   @include element(btn) {
      color: $white;
      &:visited {
         color: $white;
      }
   }

   @include sm {
      margin: 0px;
   }
}
</style>