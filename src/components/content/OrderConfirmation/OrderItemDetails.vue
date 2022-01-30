<template>
   <div class="order-page">
      <section-component>
         <template slot="page-content">
            <div class="order-page__content-details">
               <div class="checkout-step__header">
                  <div class="checkout-step__heading">
                     Review Order
                  </div>
               </div>
               <div class="checkout-step__body">
                  <div class="cart-list__item-header">
                     <div class="cart-list__container">
                        <div class="cart-list__item-detail">Item(s) Details</div>
                        <div class="cart-list__item-quantity">Quantity</div>
                        <div class="cart-list__item-amount">Amount</div>
                     </div>
                  </div>
                  <div class="cart-list__item-content">
                     <template v-for="(item) in getCartItems">
                        <div class="cart-list__item" :key="item.itemId">
                           <div class="cart-list__item-detail">
                              <div class="cart-list__product-wrapper">
                                 <router-link :to="{ name: 'plant', params: {id:`${item.itemId}`} }">
                                    <div class="cart-list__image-wrapper">
                                       <img :src="item.imgSrc" :alt="item.itemName"/>
                                    </div>
                                 </router-link>
                                 <div class="cart-list__product-details">
                                    <div class="cart-list__product-name"><p v-html="item && item.itemName"></p></div>
                                    <div class="cart-list__product-price"><p v-html="item.itemPrice"></p></div>
                                 </div>
                              </div>
                           </div>
                           <div class="cart-list__item-quantity">
                              <p v-html="item && item.quantity"></p>
                           </div>
                           <div class="cart-list__item-amount"><p>{{item.totalPrice}}</p></div>
                        </div>
                     </template>
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
export default {
  components: { SectionComponent, InputComponent },
  computed: {
      getCartItems() {
         return this.$store?.getters?.getLastCartDetails;
      }
   },
   watch: {
      getCartItems: {
         deep: true,
         immediate:true,
         handler(oldValue, newValue) {
            if(oldValue.length <=0) {
               this.$router.push('/account/orders');
            }
         }
      }
   }
}
</script>