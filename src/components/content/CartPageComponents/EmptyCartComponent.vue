<template>
   <section-component :showContainer="true">
      <template slot="page-content">
         <div class="empty-cart">
            <card-container :hasFooter="true">
               <template slot="card-image">
                  <img src="../../../resources/img/cart-icon.webp" alt="Empty Cart"/>
               </template>
               <template slot="card-text">
                  <h1 class="empty-cart__title">Your Cart is Empty</h1>
               </template>
               <template slot="card-description">
                  <p class="empty-cart__description">Looks Like You haven't made Your Choice Yet</p>
               </template>
               <template slot="card-footer">
                     <div class="empty-cart__card-footer">
                        <clickables :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="'/'">{{'Start Shopping'}}</clickables>
                     </div>
               </template> 
            </card-container>
         </div>
      </template>
   </section-component>
</template>

<script>
import CardContainer from '../../util-content/card-container/CardContainer.vue';
import Clickables from '../../util-content/clickables/clickables.vue';
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
export default {
   components: { CardContainer, Clickables, SectionComponent },
}
</script>

<style lang="scss" scoped>
.empty-cart {
   margin-right: auto;
   margin-left: auto;
   .card-container {
      text-align: center;
   }

   @include element(title) {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
   }

   @include element(description) {
      font-size: 14px;
      margin-bottom: 15px;
   }

   @include element(card-footer) {
      .btn {
         margin: 20px 0px 80px;
         color: $white;
      }
   }
}
</style>