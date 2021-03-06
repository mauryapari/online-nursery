<template>
   <section-component>
      <template slot="page-content">
         <div class="cart-list">
            <div class="cart-list__header">
               <h1>My Cart</h1>
               <span class="cart-list__clear-cart" @click="clearCart">Clear Cart</span>
            </div>
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
                                 <div class="cart-list__product-name"><h2 v-html="item && item.itemName"></h2></div>
                                 <div class="cart-list__product-price"><h3 v-html="item.itemPrice"></h3></div>
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
                     <div class="cart-list__item-amount"><p><i class="icon icon-rupee"></i>{{item.totalPrice}}</p></div>
                  </div>
               </template>
            </div>
         </div>
         <clickables class="cart-list__btn" :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="'#/plant'">{{'Continue Shopping'}}</clickables>
      </template>
   </section-component>
</template>

<script>
import Clickables from '../../util-content/clickables/clickables.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import SectionComponent  from '../../util-content/page-background/SectionComponent.vue';

export default {
   components: { SectionComponent, Clickables, InputComponent },
   data() {
      return {
         cartItems:[],
      }
   },
   watch:{
      getCartItems: {
         deep: true,
         immediate: true,
         handler() {}
      }
   },
   computed: {
      getCartItems() {
         this.cartItems = this.$store?.getters?.getCartData;
         return this.$store?.getters?.getCartData;
      },
      getCartItemObj() {
         return this.$store?.getters?.getCartItemObj;
      },
      isUserLogedIn() {
         return this.$store?.getters?.getUserLoggedIn;
      }
   },
   methods: {
      removeItem(id) {
         if(this.isUserLogedIn) {
            this.$store.dispatch('removeCartItem', id);
         } else {
            this.$store.dispatch('removeLocalCartItem', id);
         }
      },
      clearCart() {
         if(this.isUserLogedIn) {
            this.$store.dispatch('removeCartItem', '');
         } else {
            this.$store.dispatch('removeLocalCartItem', '');
         }
      }
   }
}
</script>

<style lang="scss">
.cart-list {

   @include element(header) {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   @include element(clear-cart) {
      margin-left: 15px;
      font-size: 14px;
      color: $brand-blue;
      border-bottom: 1px solid $brand-blue;
      &:hover {
         cursor: pointer;
      }
   }

   @include element(item-header) {
      background-color: $brand-grey-200;
   }

   @include element(container) {
      display: flex;
      padding: 15px 20px;
   }

   @include element(item-detail) {
      width: 70%;
      font-size: 14px;
      font-weight: 500;
   }

   @include element(item-quantity) {
      width: 15%;
      font-size: 14px;
      font-weight: 500;
      p {
         padding-left: 25px;
         font-size: 16px;
      }
   }

   @include element(item-amount) {
      width: 15%;
      font-size: 14px;
      font-weight: 500;
      text-align: right;
      p {
         font-size: 16px;
      }
   }

   @include element(item-content) {
      padding: 20px 20px 10px;
   }

   @include element(item) {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid $brand-grey-200;
   }

   @include element(product-wrapper) {
      display: flex;
      padding-bottom: 20px;
   }

   @include element(image-wrapper) {
      width: 80px;
      height: 80px;
      img {
         max-width: 100%;
      }
   }

   @include element(product-details) {
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

   @include element(product-name) {
      margin-bottom: 15px;
   }

   @include element(product-price) {
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 700;
   }

   @include element(options-wrapper) {
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 700;
   }

   @include element(wishlist) {
      padding-right: 40px;
      margin-bottom: 20px;
      &:hover {
         cursor: pointer;
      }
   }

   @include element(remove) {
      &:hover {
         color: $brand-blue;
         cursor: pointer;
      }
   }

   @include element(btn) {
      margin-left: 20px;
      margin-bottom: 20px;
      color: $white;
      &:visited {
         color: $white;
      }
   }

   @include sm {
      @include element(options-wrapper) {
         flex-direction: row;
      }

      @include element(wishlist) {
         margin-bottom: 0px;
      }
   }
}
</style>