<template>
   <user-form :modalTitle="title" :modalSubTitle="subTitle">
      <template>
         <form @submit.prevent="submitSignInForm">
            <fieldset>
               <div class="user-form__field-wrappers">
                  <div class="user-form__input-container">
                        <input-component
                           :fieldLabel="'email'"
                           :fieldPlaceholder="'Email'"
                           :value="email"
                           :isRequired="true"
                           :errorMsg="mailErrorMsg"
                           v-model="email"></input-component>
                        <input-component
                           :fieldLabel="'password'"
                           :fieldPlaceholder="'Password'"
                           :value="password"
                           :isRequired="true"
                           :errorMsg="passErrorMsg"
                           v-model="password"></input-component>
                  </div>                  
               </div>
            </fieldset>
            <div class="user-form__submit-btn">
               <clickables :btnSize="'lg'" :btnType="'secondary'">{{'Sign In'}}</clickables>
            </div>
         </form>
         <div class="user-form__signin-link">
            <clickables :btnType="'none'" :isLink="true" @click.native="showSignInForm">{{'Don\'t have an account? Sign Up'}}</clickables>
         </div>
      </template>
   </user-form>
</template>

<script>
import UserForm from './UserForm.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import clickables from '../../util-content/clickables/clickables.vue';
export default {
   components: { UserForm, clickables, InputComponent },
   data() {
      return {
         title: 'Log In',
         subTitle: 'Get access to your Orders, Wishlist and Recommendations.',
         email: '',
         password: '',
         passErrorMsg: '',
         mailErrorMsg: ''
      }
   },
   methods: {
      showSignInForm() {
         this.$store.dispatch('setModalName', 'signin-form');
      },
      submitSignInForm() {
         const emailCheck = window?.globalFun?.util?.emailValidation(this.email);
         if(emailCheck && this.password.length > 6) {
            //action call for signin
            return;
         } else if(!emailCheck) {
            this.mailErrorMsg = 'Please provide a correct mail ID';
            return;
         } else {
            this.passErrorMsg = 'Please enter the correct password';
         }
      }
   }
   
}
</script>