<template>
    <div>
      <header-component></header-component>
      <div class="background-page">
            <empty-cart-component v-if="!getCartItems"></empty-cart-component>
         <div class="cart-page" v-else>
            <cart-list-compoenent></cart-list-compoenent>
            <cart-invoice-compoenent></cart-invoice-compoenent>
         </div>
      </div>
    </div>
</template>
<script>
import HeaderComponent from '../content/HeaderComponent.vue';
import SectionComponent from '../util-content/page-background/SectionComponent.vue';
import EmptyCartComponent from '../content/CartPageComponents/EmptyCartComponent.vue';
export default {
  components: { HeaderComponent, SectionComponent, EmptyCartComponent },
  computed: {
     getCartItems() {
        return this.$store?.getters?.getCartData?.length;
     }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
   margin: 20px 0px;
}
</style>