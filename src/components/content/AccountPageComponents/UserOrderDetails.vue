<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__order-details">
            <div class="account-page__order-contianer" :class="{'account-page--has-spinner': this.showSpinner}">
               <spinner :size="'lg'" v-if="this.showSpinner"></spinner>
               <div class="account-page__order-details-item" v-if="!this.showSpinner && selectedOrder">
                  <div class="account-page__order-details-header">
                     <div class="account-page__order-id">
                        <div class="account-page__order-id-info">
                           <span class="label-txt">ORDER ID:</span>
                           <span class="label-value">#{{selectedOrder.orderID}}</span>
                        </div>
                        <div class="account-page__order-date-info">
                           <span class="label-txt">Placed on</span>
                           <span class="label-value"> 16 Jan '22, 2:12 pm</span>
                        </div>
                     </div>
                     <div class="account-page__status-amount-holder">
                        <div class="account-page__order-status">
                           <div class="account-page__order-status-info">
                              <span class="label-txt">ORDER</span>
                              <span class="label-value">CONFIRMED</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="account-page__order-info-holder">
                     <div class="account-page__address-detail-holder">
                        <div class="account-page__details-header">Delivery Address</div>
                        <div class="order-page__delivery-method">Home Delivery</div>
                        <div class="order-page__user-name"><p v-html="selectedOrder && selectedOrder.address && selectedOrder.address.name"></p></div>
                        <div class="order-page__user-address">
                           <span v-html ="selectedOrder && selectedOrder.address && selectedOrder.address.flat"></span>
                           <span v-html ="selectedOrder && selectedOrder.address && selectedOrder.address.street"></span>
                           <span v-html ="selectedOrder && selectedOrder.address && selectedOrder.address.town"></span>
                           <span v-html ="selectedOrder && selectedOrder.address && selectedOrder.address.pincode"></span>
                           <span v-html ="selectedOrder && selectedOrder.address && selectedOrder.address.state"></span>
                        </div>
                     </div>
                     <div class="account-page__payment-detail-holder">
                        <div class="account-page__details-header">Payment Method</div>
                        <div class="account-page__payment-method">Cash On Delivery</div>
                        <div class="mgt-10">
                           <div class="account-page__details-header">DELIVERY DETAILS</div>
                           <div class="account-page__delivery-details-body">
                              <div class="account-page__details-title">Delivery Schedule</div>
                              <div class="account-page__details-value">Thu, 20 Jan '22 | 2:15 PM</div>
                           </div>
                        </div>
                     </div>
                     <div class="account-page__order-summary-holder">
                        <div class="account-page__details-header">Order Summary</div>
                        <div class="account-page__order-summary-body">
                           <div class="account-page__order-summary-item">
                              <div class="account-page__details-title">Item(s) Total</div>
                              <div class="account-page__details-value">999</div>
                           </div>
                           <div class="account-page__order-summary-item">
                              <div class="account-page__details-title"><span>Delivery Charges</span></div>
                              <div><span class="account-page__details-value">FREE</span></div>
                           </div>
                        </div>
                        <div class="account-page__grand-total account-page__order-summary-item">
                           <div class="account-page__details-title"><span>Grand Total</span></div>
                           <div class="account-page__details-value"><i class="icon-currencyB icon-style"></i><span>999</span></div>
                        </div>
                     </div>
                  </div>
                  <template v-for="(item, index) in selectedOrder.cartItem">
                     <div class="account-page__order-item-detail" :key="index">
                        <div class="account-page__product-info">
                           <div class="account-page__image-container">
                              <router-link :to="{ name: 'plant', params: {id:`${item.itemId}`} }">
                                 <img :src="item.imgSrc" :alt="item.itemName"/>
                              </router-link>
                           </div>
                           <div class="account-page__name-container">
                              <div class="account-page__product-name account-page__details-title">{{item.itemName}}</div>
                           </div>
                        </div>
                        <div class="account-page__product-quantity">
                           <div class="account-page__quantity-ordered"><span class="quantity">{{item.quantity}}</span>&nbsp;<span>Qty</span></div>
                        </div>
                        <div class="account-page__amount-holder">
                           <div class="account-page__product-amount"><i class="icon-currencyB icon-style"></i>{{item.totalPrice}}</div>
                        </div>
                  </div>
                     </template>
               </div>
            </div>
         </div>
      </template>
   </section-component>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import Spinner from '../../util-content/spinner/spinner.vue';
export default {
   components: {SectionComponent, Spinner},
   data() {
      return {
         selectedOrder: {},
         showSpinner: false
      }
   },
   computed: {
      getSelectedOrderData() {
         this.selectedOrder = this.$store?.getters?.getSelectedOrderData
         return this.$store?.getters?.getSelectedOrderData;
      }
   },
   watch: {
      getSelectedOrderData: {
         deep: true,
         handler() {
            this.showSpinner = false;
            this.selectedOrder = this.getSelectedOrderData;
         }
      }
   },
   mounted() {
      const id = this.$route?.params?.id;
      if(id) {
         this.$store.dispatch('setCurrentOrderData', id);
         this.showSpinner = true;
      }
   }
}
</script>