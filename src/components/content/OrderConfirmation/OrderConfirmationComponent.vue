<template>
<div class="order-page">
   <section-component>
      <template slot="page-content">
         <div class="order-page__content">
            <div class="order-page__confirmation-image">
               <img src="../../../resources/img/OrderSuccessful.webp" alt="Order Successfull"/>
            </div>
            <div class="order-page__confirmation-header">
               <div class="order-page__confirmation-heading">
                  Your Order has been Successfully Placed
               </div>
            </div>
         </div>  
      </template>
   </section-component>
   <order-details></order-details>
   <order-item-details></order-item-details>
</div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import OrderDetails from './OrderDetails.vue';
import OrderItemDetails from './OrderItemDetails.vue';
export default {
   components: { SectionComponent, OrderDetails, OrderItemDetails }
}
</script>
