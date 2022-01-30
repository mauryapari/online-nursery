<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="account-page__profile" :class="{'account-page--has-spinner': !userDetails}">
            <spinner :size="'lg'" v-if="!userDetails"></spinner>
            <div class="account-page__address-contianer" v-else>
               <div class="account-page__user-detail">
                  <div class="account-page__user-label">Name:</div>
                  <div class="account-page__user-value"><p v-html="userDetails && userDetails.users[0].displayName"></p></div>
               </div>
               <div class="account-page__user-detail">
                  <div class="account-page__user-label">Mail:</div>
                  <div class="account-page__user-value"><p v-html="userDetails && userDetails.users[0].email"></p></div>
               </div>
               <div class="account-page__user-detail">
                  <div class="account-page__user-label">Mobile:</div>
                  <div class="account-page__user-value"></div>
               </div>
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
       userDetails() {
        return this.$store?.getters?.getUserDetails;
     }
   }
}
</script>
