<template>
   <div class="checkout-step">
      <div class="checkout-step__icon-container accordian-container__icon-container">
         <span class="icon icon-shopping-bag"></span>
      </div>   
      <section-component>
         <template slot="page-content">
            <div class="accordian-container__placeholder-text" v-if="!getReviewDetails">Review Order</div>
            <div class="checkout-step__content" v-else>
               <div class="checkout-step__header">
                  <div class="checkout-step__heading">
                     Review Order
                  </div>
                  <div class="checkout-step__change-button" v-if="getShowPayment">
                     <clickables :btnType="'secondary'" :btnSize="'sm'" @click.native="showPayment">{{'Review'}}</clickables>
                  </div>
               </div>
               <div class="checkout-step__body" v-if="!getShowPayment">
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
                                    <div class="cart-list__options-wrapper">
                                       <div class="cart-list__wishlist">Move to Wishist</div>
                                       <div class="cart-list__remove" @click.prevent="removeItem(item.itemId)">X Remove</div>
                                    </div>
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
                  <div class="checkout-step__make-payment-btn">
                     <clickables :btnType="'secondary'" @click.native="showPayment">{{'Make Payment'}}</clickables>
                  </div>
               </div>
               <div class="checkout-step__review-items" v-if="getShowPayment">{{getItems}} Item</div>
            </div>  
         </template>
      </section-component>
   </div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import clickables from '../../util-content/clickables/clickables.vue';

export default {
  components: { SectionComponent, InputComponent, clickables },
  computed: {
      getCartItems() {
         this.cartItems = this.$store?.getters?.getCartData;
         return this.$store?.getters?.getCartData;
      },
      getItems() {
         return this.$store?.getters?.getCartItems;
      },
      getReviewDetails() {
         return this.$store?.getters?.getReviewDetails;
      },
      getShowPayment() {
         return this.$store?.getters?.getShowPayment;
      }
   },
   methods: {
       removeItem(id) {
         this.$store.dispatch('removeCartItem', id);
      },
      showPayment() {
         this.$store.dispatch('showPayment');
      },
   }
   
}
</script>