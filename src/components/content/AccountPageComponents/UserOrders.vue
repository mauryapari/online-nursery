<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__order" :class="{'account-page--has-spinner': this.showSpinner}">
            <spinner :size="'lg'" v-if="this.showSpinner && this.getUserOrders"></spinner>
            <div class="account-page__order-contianer">
               <empty-card-component
                  v-if="!getUserOrderData.length"
                  :imgSrc="'../../resources/img/emptyOrder.webp'"
                  :altText="'Empty Orders'"
                  :heading="'Waiting for your Firt order'"
                  :subHeading="''"></empty-card-component>
               <div class="account-page__order-details">

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
export default {
   components: { SectionComponent, Spinner, EmptyCardComponent },
   data() {
      return {
         showSpinner: false
      }
   },
   computed: {
      userAddress() {
        return this.$store?.getters?.getUserAddress;
     },
     getUserOrders() {
        return this.$store?.getters?.getUserOrders;
     },
     getUserOrderData() {
        return this.$store?.getters?.getUserOrderData;
     }
   },
   watch: {
      getUserOrders: {
         deep: true,
         handler() {
            this.fetchUserOrderData();
         }
      },
      getUserOrderData: {
         deep: true,
         handler() {
            if(this.getUserOrderData.length) {
               this.showSpinner = false
            }
         }
      }
   },
   methods: {
      fetchUserOrderData() {
         this.showSpinner = true
         this.$store.dispatch('fetchUserOrders', this.getUserOrders);
      }
   }
}
</script>
