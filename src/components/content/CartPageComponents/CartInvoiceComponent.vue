<template>
   <section-component>
      <template slot="page-content">
         <div class="invoice-container">
            <div class="invoice-container__details" v-if="!showMyOrderBtn">
               <div class="invoice-container__details-item">
                  <div class="invoice-container__text">Item(s) Total</div>
                  <div class="invoice-container__cost">{{ getTotalCartPrice }}</div>
               </div>
               <div class="invoice-container__details-item">
                  <div class="invoice-container__text">Delivery Charges</div>
                  <div class="invoice-container__cost">Free</div>
               </div>
            </div>
            <div class="invoice-container__details-item" v-if="!showMyOrderBtn">
               <div class="invoice-container__text">Account Payable</div>
               <div class="invoice-container__cost">{{ getTotalCartPrice }}</div>
            </div>
            <clickables v-if="showShoppingBtn" class="invoice-container__btn" :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="showBtnText.link">{{showBtnText.name}}</clickables>
            <clickables v-if="showMyOrderBtn" class="invoice-container__btn" :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="'#/account'">{{'Go To My Orders'}}</clickables>
         </div>
      </template>
   </section-component>
</template>

<script>
import Clickables from '../../util-content/clickables/clickables.vue';
import SectionComponent  from '../../util-content/page-background/SectionComponent.vue';
export default {
   props: {
      showShoppingBtn: {
         type: [String, Boolean],
         default: false
      },
      showMyOrderBtn: {
         type: Boolean,
         default: false
      }
   },
   components: { SectionComponent, Clickables },
   computed: {
      getTotalCartPrice() {
         return this.$store?.getters?.getTotalCartPrice;
      },
      showBtnText() {
         if(this.showShoppingBtn === 'cart') {
            return {
               name: 'Checkout',
               link: '#/checkout'
            }
         }
         return {
            name: 'Continue Shopping',
            link: '#/plant'
         }
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
      border-bottom: 1px dotted $brand-grey-100;
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