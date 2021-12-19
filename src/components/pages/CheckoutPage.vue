<template>
   <div>
      <div class="header-section container">
        <div class="header-section__navigation-bar">
            <div class="header-section__logo-wrapper">
                <router-link to="/" exact><img src="../../resources/img/logo.webp" alt="Company Logo"></router-link>
            </div>
        </div>
      </div>
         <div class="container">
            <div class="checkout-page">
               <div class="checkout-page__list">
                  <checkout-page-component></checkout-page-component>
               </div>
               <div class="checkout-page__invoice">
                  <cart-invoice-component></cart-invoice-component>
               </div>
            </div>
         </div>
   </div>
</template>

<script>
import CheckoutPageComponent from '../content/CheckoutPageComponents/CheckoutPageComponent.vue';
import CartInvoiceComponent from '../content/CartPageComponents/CartInvoiceComponent.vue';
export default {
   components: { CartInvoiceComponent, CheckoutPageComponent }
}
</script>

<style lang="scss" scoped>
.header-section {
   padding-top: 15px;
   @include element(navigation-bar) {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   @include element(logo-wrapper) {
      img{
            max-width: 150px;
            max-height: 95px;
      }
   }
}
.checkout-page {
   margin: 20px 0px;
   display: flex;
   flex-direction: column;
   @include sm {
      flex-direction: row;
      @include element(list) {
         flex-basis: 75%;
      }

      @include element(invoice) {
         flex-basis: 25%;
         margin-left: 20px;
      }
   }
}
</style>