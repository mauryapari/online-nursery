<template>
   <div class="accordian-container">
      <div class="accordian-container__icon-container">
         <slot name="icon-container"></slot>
      </div>
      <div class="accordian-container__content-container">
         <slot name="header"></slot>
         <slot name="body"></slot>
         <slot name="footer"></slot>
      </div>
   </div>
</template>


<style lang="scss" scoped>
.accordian-container {
   position: relative;
   margin-bottom: 20px;
   margin-left: 30px;
   
   @include element(icon-container) {
      position: absolute;
      left: -40px;
      top: 25px;

      &::before {
         content: '';
         width: 40px;
         height: 40px;
         position: absolute;
         background: $icon-background-color;
         border-radius: 6px;
         box-shadow: 0 2px 8px 0 rgb(40 44 63 / 40%);
         z-index: 2;
      }
   }
}
</style>