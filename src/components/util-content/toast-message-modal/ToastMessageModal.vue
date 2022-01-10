<template>
   <div class="toast" :class="{'toast__show': title,'toast__success': isSuccess, 'toast__error': isError, 'toast__info': isInfo}">
      <span class="icon" :class="`icon-${iconName}`"></span>
      <div class="toast__text-container">
         <p class="toast__title">{{title}}</p>
         <p class="toast__subtitle">{{subtitle}}</p>
      </div>
      <button class="toast__close-btn" @click="closeModal">
         <span class="icon icon-twitter"></span>
      </button>
   </div>
</template>

<script>
export default {
   props: {
      title: {
         type: String,
         default: ''
      },
      subtitle: {
         type: String,
         default: ''
      },
      type: {
         type: String,
         default: 'info'
      },
      iconName: {
         type: String,
         default: ''
      }
   },
   computed: {
      iconType() {
         return `icon-${this.iconName}`
      },
      isSuccess() {
         return this.type === 'success' 
      },
      isError() {
         return this.type === 'error' 
      },
      isInfo() {
         return this.type === 'info' 
      }
   },
   methods: {
      closeModal() {
         this.$store.dispatch('setToastModalData', { action: false, data: {} })
      }
   }
}
</script>

<style lang="scss" scoped>
.toast {
   visibility: hidden;
   max-width: 450px;
   margin: auto;
   color: #fff;
   text-align: center;
   border-radius: 5px;
   position: fixed;
   z-index: 3;
   left: 0;
   right:0;
   bottom: 30px;
   white-space: nowrap;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px;
   
   @include element(success) {
      background-color: $brand-green;   
   }

   @include element(error) {
      background-color: $brand-red;   
   }

   @include element(info) {
      background-color: $brand-grey-500;   
   }
    
   @include element(close-btn) {
      margin-right: 16px;
      border: none;
      background: transparent;

      .icon {
         color: $white;
      }
   }

   @include element(show) {
      visibility: visible;
      animation: fadein 0.5s, fadeout 0.5s 4.5s;
   }

   @include element(text-container) {
   }

   @include element(title) {
      font-size: 16px;
      margin: 10px 0px;
   }

   @include element(subtitle) {
      font-size: 14px;
      margin: 10px 0px;
   }



}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 60px; opacity: 0;}
}
</style>
