<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__order" :class="{'account-page--has-spinner': this.showSpinner}">
            <spinner :size="'lg'" v-if="this.showSpinner && this.getUserOrderIDs"></spinner>
            <div class="account-page__order-contianer">
               <empty-card-component
                  v-if="this.showEmptyCart"
                  :imgSrc="imgSrc"
                  :altText="'Empty Orders'"
                  :heading="'Waiting for your Firt order'"
                  :subHeading="''"></empty-card-component>
               <div class="account-page__order-details">
                  <template v-for="(item, index) in this.userOrderData">
                     <div class="account-page__order-item" :key="index">
                        <div class="account-page__order-header">
                           <div>
                              <div class="account-page__order-id-info">
                                 <span class="label-txt">ORDER ID: </span>
                                 <span class="label-value">#{{item.orderID}}</span>
                              </div>
                              <div class="account-page__order-date-info">
                                 <span class="label-txt">Placed on: </span>
                                 <span class="label-value">{{generateTimeStamp(item.createdAt)}}</span>
                              </div>
                           </div>
                           <div class="account-page__order-amount">
                              <div class="account-page__amount-info">
                                 <span class="label-txt">TOTAL AMOUNT: </span>
                                 <span class="label-value"><i class="icon icon-rupee"></i>{{totalCal(item, 'totalPrice')}}</span>
                              </div>
                              <div class="account-page__item-length-info">
                                 <span class="label-txt">Total Item: </span>
                                 <span class="label-value">{{totalCal(item, 'quantity')}}</span>
                              </div>
                           </div>
                           <div class="account-page__order-status">
                              <div>
                                 <div class="account-page__order-status-info">
                                    <span class="label-txt">ORDER</span>
                                    <span class="label-value">CONFIRMED</span>
                                 </div>
                              </div>
                              <div class="account-page__details-btn">
                                 <div class="view-details">
                                    <clickables @click.native="goToOrder(item.orderID)">Details</clickables>
                                 </div>
                              </div>
                           </div>
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
import Spinner from '../../util-content/spinner/spinner.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import EmptyCardComponent from '../EmptyCardComponent.vue';
import Clickables from '../../util-content/clickables/clickables.vue';
export default {
   components: { SectionComponent, Spinner, EmptyCardComponent, Clickables },
   data() {
      return {
         userOrderData:[],
         showSpinner: false,
         showEmptyCart: false,
         imgSrc: require('../../../resources/img/emptyOrder.webp')
      }
   },
   computed: {
      userAddress() {
        return this.$store?.getters?.getUserAddress;
     },
     getUserOrderIDs() {
        return this.$store?.getters?.getUserOrders;
     },
     getUserOrderData() {
        this.userOrderData = this.$store?.getters?.getUserOrderData;
        return this.$store?.getters?.getUserOrderData;
     }
   },
   watch: {
      getUserOrderIDs: {
         deep: true,
         handler() {
            console.log('ran');
            this.fetchUserOrderData();
         }
      },
      getUserOrderData: {
         deep: true,
         handler() {
            if(this.getUserOrderData.length) {
               this.showSpinner = false;
            } else {
               this.showEmptyCart = true;
            }
         }
      }
   },
   mounted() {
      this.fetchUserOrderData();
   },
   methods: {
      fetchUserOrderData() {
         this.showSpinner = true;
         this.userOrderData = [];
         this.showEmptyCart = false;
         this.$store.dispatch('fetchUserOrders', this.getUserOrderIDs);
      },
      generateTimeStamp(data) {
         var date = new Date(data);
         return date.toDateString();
      },
      totalCal(data, value) {
         const total = data.cartItem.reduce((sum, item) => {return sum + item[value]},0);
         return total;
      },
      goToOrder(id) {
         // this.$store.dispatch('setCurrentOrderData', id);
         this.$router.push({ name: 'orders', params: {id: id} });
      }
   }
}
</script>
