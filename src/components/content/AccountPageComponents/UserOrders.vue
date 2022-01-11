<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__order" :class="{'account-page--has-spinner': !userAddress}">
            <spinner :size="'lg'" v-if="!userAddress"></spinner>
            <div class="account-page__order-contianer" v-else>
               <div class="account-page__delivery-method">Home Delivery</div>
               <div class="account-page__user-name"><p v-html="userAddress && userAddress.name"></p></div>
               <div class="account-page__user-address">{{userAddress.flat}} {{userAddress.street}} {{userAddress.town}} {{userAddress.pincode}} {{userAddress.state}}</div>
            </div>
         </div>
      </template>
   </section-component>
</template>

<script>
import Spinner from '../../util-content/spinner/spinner.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
   components: { SectionComponent, Spinner },
   computed: {
       userAddress() {
        return this.$store?.getters?.getUserAddress;
     }
   }
}
</script>
