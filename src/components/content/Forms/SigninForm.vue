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
                        @onChange="getInputValue"></input-component>
                     <input-component
                        :fieldLabel="'password'"
                        :fieldPlaceholder="'Password'"
                        :value="password"
                        :isRequired="true"
                        :errorMsg="passErrorMsg"
                        @onChange="getInputValue"></input-component>
                  </div>                  
               </div>
            </fieldset>
            <div class="user-form__submit-btn">
               <clickables :btnSize="'lg'" :btnType="'secondary'">{{'Sign In'}}</clickables>
            </div>
         </form>
         <div class="user-form__signin-link">
            <clickables :btnType="'none'" :isLink="true" @click.native="showSignInForm">{{'Existing User? Log In'}}</clickables>
         </div>
      </template>
   </user-form>    
</template>

<script>
import UserForm from './UserForm.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import Clickables from '../../util-content/clickables/clickables.vue';
export default {
   components: { UserForm, InputComponent, Clickables },
   data() {
      return {
         title: 'Sign Up',
         subTitle: 'We do not share your personal details with anyone',
         email: '',
         password: '',
         passErrorMsg: '',
         mailErrorMsg: ''
      }
   },
   watch: {
      email() {
         this.mailErrorMsg = '';
      },
      password() {
         this.passErrorMsg = '';
      }
   },
   methods: {
      getInputValue(data) {
         // console.log(data);
         if(data.fieldLabel === 'email') {
            this.email = data.value
         }
         if(data.fieldLabel === 'password') {
            this.password = data.value
         }
      },
      showSignInForm() {
         this.$store.dispatch('setModalName', 'login-form');
      },
      submitSignInForm() {
         const emailCheck = window?.globalFun?.util?.emailValidation(this.email);
         if(emailCheck && this.password.length > 6) {
            //action call for signin
            this.mailErrorMsg = '';
            this.passErrorMsg = '';
            return;
         } else if(!emailCheck) {
            this.mailErrorMsg = 'Please provide a correct mail ID';
            return;
         } else {
            this.passErrorMsg = 'Please enter the correct password';
         }
      }
   },
}
</script>