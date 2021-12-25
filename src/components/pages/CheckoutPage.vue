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

<style lang="scss">
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

   .checkout-step {
      position: relative;
      margin-left: 30px;
      margin-bottom: 20px;

      &:not(:last-child) {
         .page-section {
            position: relative;
            &::after {
               content: '';
               height: calc(100%);
               width: 0;
               position: absolute;
               left: -18px;
               top: 50px;
               border-left: 1px dashed #bebfc5;
            }
         }
      }

      @include element(content) {
         padding: 35px 25px;
      }

      @include element(header) {
         display: flex;
         justify-content: space-between;
      }

      @include element(heading) {
         padding: 0 0 25px;
         font-size: 16px;
         text-transform: uppercase;
         font-weight: 700;
      }

      @include element(body) {
       
      }

      @include element(field-wrappers) {
         display: flex;
         flex-wrap: wrap;
      }

      .input-field {
         @include element(container) {
            width: 100%;
            margin-bottom: 30px;
         }

         @include element(label-container) {
            display: none;
         }

         @include element(elem) {
            width: 100%;
            height: 50px;
            background-color: $brand-grey-300;
            border-radius: 8px;
            border: 1px solid $brand-grey-300;
            box-shadow: none;
            padding: 6px 12px;
            outline: none;
            &:focus {
               background-color: $brand-grey-200;
            }
         }
      }
      @include element(submit-btn) {
         text-align: center;
         margin-top: 15px;
      }

      @include element(make-payment-btn) {
         text-align: right;
      }

      @include element(payment-body) {
         display: flex;
      }

      @include element(payment-options) {
         width: 30%;
      }

      @include element(payment-description) {
         width: 70%;
         text-align: center;
      }

      @include element(payment-image) {
         width: 100px;
      }

      @include element(payment-card-text) {
         padding: 25px 0px;
         font-size: 14px;

      }

      @include sm {
         .input-field {
            @include element(container) {
               width: calc(50% - 30px);
               margin-right: 15px;
            }
         }
      }
   }
}
</style>