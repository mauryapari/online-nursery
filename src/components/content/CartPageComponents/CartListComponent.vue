<template>
   <section-component>
      <template slot="page-content">
         <div class="cart-list">
            <div class="cart-list__header">
               <h1>My Cart</h1>
            </div>
            <div class="cart-list__item-header">
               <div class="cart-list__container">
                  <div class="cart-list__item-detail">Item(s) Details</div>
                  <div class="cart-list__item-quantity">Quantity</div>
                  <div class="cart-list__item-amount">Amount</div>
               </div>
            </div>
            <div class="cart-list__item-content">
               <template v-for="(item, index) in getCartItems">
                  <div class="cart-list__item" :key="index">
                     <div class="cart-list__item-detail">
                        <router-link :to="{ name: 'plant', params: {id:`${item.itemId}`} }">
                           <div class="cart-list__product-wrapper">
                              <div class="cart-list__image-wrapper">
                                 <img :src="item.imgSrc" :alt="item.itemName"/>
                              </div>
                              <div class="cart-list__product-details">
                                 <div class="cart-list__product-name"><p v-html="item && item.itemName"></p></div>
                                 <div class="cart-list__product-price"><p v-html="item.itemPrice"></p></div>
                                 <div class="cart-list__options-wrapper">

                                 </div>
                              </div>
                           </div>
                        </router-link>
                     </div>
                     <div class="cart-list__item-quantity">
                        <input-component
                        :fieldLabel="`quan`"
                        :fieldPlaceholder="'quan'"
                        :value="item.quantity"
                        :isRequired="true"
                        :errorMsg="''"
                        @onChange="getInputValue"></input-component>
                        <!-- <select v-model="itemQuantity" @change="quantitySelector(item.itemId)">
                           <template v-for="index in 10" >
                              <option :key="index" :value="index" :selected="item.quantity" >{{index}}</option>
                           </template>
                        </select> -->
                     </div>
                     <div class="cart-list__item-amount"><p v-html="item && item.totalPrice"></p></div>
                  </div>
               </template>
            </div>
         </div>
         <clickables :btnType="'secondary'" class="cart-list__btn">Continue Shopping</clickables>
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
      // InputComponenturn {
         itemQuantity: 1
      }
   },
   computed: {
      getCartItems() {
         return this.$store?.getters?.getCartData;
      },
      getCartItemObj() {
         return this.$store?.getters?.getCartItemObj;
      }
   },
   methods: {
      quantitySelector(data) {
         const index = this.getCartItems.findIndex(item => item.itemId === data);
         console.log(index);
         this.$store.dispatch('addToCart', {payload: this.getCartItemObj[index], quantity: this.itemQuantity})
      }
   }
}
</script>

<style lang="scss">
.cart-list {

   @include element(header) {
      padding: 20px;
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
      .input-field {
         @include element(container) {
            width: 30px;
         }
         @include element(label-container) {
            display: none;
         }
         @include element(elem) {
            width: 40px;
            text-align: center;
         }
      }
   }

   @include element(item-amount) {
      width: 15%;
      font-size: 14px;
      font-weight: 500;
      text-align: right;
   }

   @include element(item-content) {
      padding: 20px;
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
   }

   @include element(btn) {
      margin-left: 20px;
      margin-bottom: 20px;
   }
}
</style>