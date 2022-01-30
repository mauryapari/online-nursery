<template>
   <div class="account-page">
      <section-component :hasBreadCrumb="true" :showContainer="true">
         <template slot="page-breadcrumb">
            <breadcrumb-component></breadcrumb-component>
         </template>
         <template slot="page-content">
            <div class="account-page__user" >
               <div class="account-page__user-pic-container">
                  <img src="../../../resources/img/user.webp" alt="user profile pic"/>
               </div>
               <div class="account-page__user-description"><h1 v-html="getUserName"></h1></div>
               <div class="account-page__options">
                  <ul  class="account-page__options-list">
                     <li class="account-page__options-item">
                        <router-link to="/account/profile"><span class="icon icon-user"></span>Profile</router-link>
                     </li>
                     <li class="account-page__options-item">
                        <router-link to="/account/orders"> <span class="icon icon-credit-card"></span>Orders</router-link>
                     </li>
                     <li class="account-page__options-item">
                        <router-link to="/account/address"><span class="icon icon-map-marker"></span>Address</router-link>
                     </li>
                     <li class="account-page__options-item">
                        <router-link to="/"><span class="icon icon-heart"></span>Wishlist</router-link>
                     </li>
                     <li class="account-page__options-item">
                        <router-link to="/"><span class="icon icon-key"></span>Change Password</router-link>
                     </li>
                  </ul>
               </div>
            </div>
         </template>
      </section-component>
      <router-view></router-view>
   </div>   
</template>

<script>
import BreadcrumbComponent from '../BreadcrumbComponent.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
   components: { SectionComponent, BreadcrumbComponent }, 
   computed: {
      getUserName() {
         return this.$store?.getters?.getUserName;
      }
   }
}
</script>
