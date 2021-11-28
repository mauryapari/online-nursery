<template>
   <modal>
      <template slot="body">
         <div class="user-form">
            <div class="user-form__form-description">
               <div class="user-form__desc-image">
                  <img src="../../../resources/img/logo.webp" alt="Logo"/>
               </div>
               <div class="user-form__desc-header">
                  <div class="user-form__desc-title" v-html="modalTitle"></div>
               </div>
               <div class="user-form__desc-subheader">
                  <div class="user-form__desc-subtitle" v-html="modalSubTitle"></div>
               </div>
            </div>
            <div class="user-form__form-fields">
               <slot></slot>
            </div>
         </div>
      </template>
   </modal>
</template>

<script>
import Modal from '../../util-content/modal/modal.vue';
export default {
   props: {
      modalTitle: {
         type: String,
         default: ''
      },
      modalSubTitle: {
         type: String,
         default: ''
      }
   },
   components: { Modal }
   
}
</script>

<style lang="scss" scoped>
.user-form {
   display: flex;
   justify-content: center;
   flex-direction: column;

   @include element(form-description) {
      display: flex;
      flex-direction: column;
   }

   @include element(form-fields) {
      flex-basis: 60%;
      padding: 40px 0px;
   }

   @include element(desc-image) {
      margin-bottom: 30px;
      img {
         max-width: 204px;
      }
   }

   @include element(desc-header) {
      padding-right: 20px;
   }

   @include element(desc-title) {
      border-bottom: 1px solid $brand-grey-200;
      font-size: 28px;
      line-height: 1.2;
      padding-bottom: 15px;

   }

   @include element(desc-subheader) {
      padding-right: 20px;
   }

   @include element(desc-subtitle) {
      font-size: 16px;
      line-height: 1.5;
      margin-top: 15px;
   }

   @include sm {
      flex-direction: row;

        @include element(form-description) {
         flex-basis: 40%;
         border-right: 1px solid $brand-grey-200;
         align-self: center;
      }
   }

   // Login and Sign in Form Css
   @include element(signin-link) {
      text-align: center;
      margin-top: 20px ;
      a {
         color: $brand-blue;
      }
   }

   @include element(input-container) {
      margin-bottom: 30px;
      .input-field {
         @include element(container) {
            input {
               width: 100%;
               height: 50px;
               background-color: #eeeeee;
               border-radius: 8px;
               border: 1px solid #eeeeee;
               box-shadow: none;
               padding: 6px 12px;
               
               &:active,
               &:focus {
                  outline: none;
               }
            }
            &:not(:last-child) {
               margin-bottom: 30px;
            }
         }
         @include element(label-container) {
            display: none;
         }
      }
   }

   @include element(submit-btn) {
      text-align: center;
      margin-top: 15px;
   }

   @include sm {
      @include element(input-container) {
         margin-left: 30px;
      }
   }
}
</style>