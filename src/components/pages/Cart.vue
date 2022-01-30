<template>
    <div>
      <header-component></header-component>
            <empty-cart-component v-if="!cartItemsLength"></empty-cart-component>
         <div class="container" v-else>
            <div class="cart-page">
               <div class="cart-page__list">
                  <cart-list-component></cart-list-component>
               </div>
               <div class="cart-page__invoice">
                  <cart-invoice-component :showShoppingBtn="'cart'"></cart-invoice-component>
               </div>
            </div>
         </div>
      </div>
</template>
<script>
import HeaderComponent from '../content/HeaderComponent.vue';
import EmptyCartComponent from '../content/CartPageComponents/EmptyCartComponent.vue';
import CartListComponent from '../content/CartPageComponents/CartListComponent.vue';
import CartInvoiceComponent from '../content/CartPageComponents/CartInvoiceComponent.vue';

export default {
  components: { HeaderComponent, EmptyCartComponent, CartListComponent, CartInvoiceComponent },
  computed: {
     cartItemsLength() {
        return this.$store?.getters?.getCartItems;
     }
  },
  watch: {
     cartItemsLength(){
        //
     }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
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