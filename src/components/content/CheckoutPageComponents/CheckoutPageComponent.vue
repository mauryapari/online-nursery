<template>
<div class="checkout-flow">
   <address-component></address-component>
   <delivery-status></delivery-status>
   <review-order></review-order>
   <payment></payment>
</div>
</template>

<script>
import AddressComponent from './AddressComponent.vue';
import DeliveryStatus from './DeliveryStatus.vue';
import Payment from './Payment.vue';
import ReviewOrder from './ReviewOrder.vue';
export default {
  components: { AddressComponent, DeliveryStatus, ReviewOrder, Payment },
   
}
</script>

<style lang="scss" scoped>
.checkout-flow {
   display: flex;
   flex-direction: column;
}
</style>