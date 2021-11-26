<template>
   <div class="container">
      <slot name="page-breadcrumb" v-if="hasBreadCrumb"></slot>
      <div class="page-section">
         <slot name="page-content"></slot>
      </div>
</div>
</template>

<script>
export default {
   props: {
      hasBreadCrumb: {
         type: Boolean,
         default: false
      }
   }
}
</script>
<style lang="scss">
.page-section {
   background-color: $white;
    box-shadow: 0 0 9px 0 rgb(0 0 0 / 20%);
    border-radius: 10px;
}
</style>