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
                  <order-confirmation-component></order-confirmation-component>
               </div>
               <div class="checkout-page__invoice">
                  <cart-invoice-component :showShoppingBtn="'order'" :showMyOrderBtn="true"></cart-invoice-component>
               </div>
            </div>
         </div>
         <footer-component></footer-component>
   </div>
</template>

<script>
import OrderConfirmationComponent from '../content/OrderConfirmation/OrderConfirmationComponent.vue';
import CartInvoiceComponent from '../content/CartPageComponents/CartInvoiceComponent.vue';
import FooterComponent from '../content/FooterComponent.vue';
export default {
   components: { CartInvoiceComponent, OrderConfirmationComponent, FooterComponent }
}
</script>

<style lang="scss">
.order-page {

   @include element(content) {
      display: flex;
      flex-direction: row;
      padding: 25px;
      align-items: center;
      margin-bottom: 30px;
      
      @include modifier(col) {
         align-items: flex-start;
      }
   }

   @include element(content-details) {
      padding: 25px;
      margin-bottom: 30px;
   }

   @include element(confirmation-header) {
      margin-left: 20px;
   }

   @include element(confirmation-image) {
      img {
         width: 90px;
         height: 90px;
      }
   }

   @include element(data-point) {
      display: flex;
      flex-direction: row;
      width: 33%;
   }

   @include element(details-header) {
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 18px;
   }

   @include element(icon-container) {
      padding-right: 10px;
   }

   @include element(delivery-method) {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 10px;
      line-height: 18px;
   }

   @include element(user-name) {
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
   }

   @include element(user-address) {
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
   }

   @include element(delivery-date) {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
   }

   @include element(delivery-time) {
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
   }
}
</style>