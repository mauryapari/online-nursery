<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__address">
            <div class="account-page__no-result-found" v-if="!userAddress">No Result Found</div>
            <div class="account-page__address-contianer" v-else>
               <div class="account-page__delivery-method">Home Delivery</div>
               <div class="account-page__user-name"><p v-html="userAddress && userAddress.name"></p></div>
               <div class="account-page__user-address">{{userAddress.flat}} {{userAddress.street}} {{userAddress.town}} {{userAddress.pincode}} {{userAddress.state}}</div>
            </div>
         </div>
      </template>
   </section-component>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
   data() {
      return {
         showLoader: true
      }
   },
   components: { SectionComponent },
   watch: {
      userAddress: {
         handler() {
            this.showLoader = false;
         }
      }
   },
   computed: {
       userAddress() {
        return this.$store?.getters?.getUserAddress;
     }
   }
}
</script>
