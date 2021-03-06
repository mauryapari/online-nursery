<template>
   <div class="checkout-step">
      <div class="checkout-step__icon-container accordian-container__icon-container">
         <span class="icon icon-map-marker"></span>
      </div>   
      <section-component>
         <template slot="page-content">
            <div class="accordian-container__placeholder-text" v-if="!isAddressFilled">Delivery Address</div>
            <div class="checkout-step__content" >
               <div class="checkout-step__header">
                  <div class="checkout-step__heading">
                     <h2>Delivery Adddress</h2>
                  </div>
                  <div class="checkout-step__change-button" v-if="userAddress">
                     <clickables :btnType="'secondary'" :btnSize="'sm'" @click.native="showForm">{{this.btnValue}}</clickables>
                  </div>
               </div>
               <div class="checkout-step__body remove-number-stepper">
                  <form @submit.prevent="submitAddressData" v-if="(!userAddress || isAddressChanging)">
                     <fieldset>
                        <legend>Enter User Address</legend>
                        <div class="checkout-step__field-wrappers">
                           <input-component
                              :fieldLabel="'name'"
                              :fieldPlaceholder="'Name'"
                              :value="address.name"
                              :isRequired="true"
                              :errorMsg="errorMsgs.name"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'email'"
                              :fieldPlaceholder="'Email'"
                              :inputType="'email'"
                              :value="address.email"
                              :isRequired="true"
                              :errorMsg="errorMsgs.email"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'pincode'"
                              :fieldPlaceholder="'Pincode'"
                              :inputType="'number'"
                              :value="address.pincode"
                              :isRequired="true"
                              :errorMsg="errorMsgs.pincode"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'flat'"
                              :fieldPlaceholder="'Flat Number'"
                              :value="address.flat"
                              :isRequired="true"
                              :errorMsg="errorMsgs.flat"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'street'"
                              :fieldPlaceholder="'Street'"
                              :value="address.street"
                              :isRequired="true"
                              :errorMsg="errorMsgs.street"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'area'"
                              :fieldPlaceholder="'Area'"
                              :value="address.area"
                              :isRequired="true"
                              :errorMsg="errorMsgs.area"
                              @onChange="getInputValue"></input-component>
                              <input-component
                              :fieldLabel="'town'"
                              :fieldPlaceholder="'City/Town'"
                              :value="address.town"
                              :isRequired="true"
                              :errorMsg="errorMsgs.town"
                              @onChange="getInputValue"></input-component>
                           <input-component
                              :fieldLabel="'state'"
                              :fieldPlaceholder="'State'"
                              :value="address.state"
                              :isRequired="true"
                              :errorMsg="errorMsgs.state"
                              @onChange="getInputValue"></input-component>
                        </div>
                     </fieldset>
                     <div class="user-form__submit-btn">
                        <clickables :btnSize="'lg'" :btnType="'secondary'">{{'Save & Continue'}}</clickables>
                     </div>
                  </form>
                  <div class="checkout-step__address-container" v-else>
                     <div class="checkout-step__delivery-method">Home Delivery</div>
                     <div class="checkout-step__user-name"><p>{{userAddress.name}}</p></div>
                     <div class="checkout-step__user-address">{{userAddress.flat}} {{userAddress.street}} {{userAddress.town}} {{userAddress.pincode}} {{userAddress.state}}</div>
                  </div>
               </div>
            </div>
         </template>
      </section-component>
   </div>
</template>

<script>
import SectionComponent from '../../util-content/page-background/SectionComponent.vue';
import InputComponent from '../../util-content/InputComponent/InputComponent.vue';
import clickables from '../../util-content/clickables/clickables.vue';

export default {
  components: { SectionComponent, InputComponent, clickables },
  data() {
     return {
        address: {
           name: '',
           email: '',
           pincode: '',
           flat: '',
           street: '',
           area: '',
           town: '',
           state: '',
        },
        errorMsgs: {
           name: '',
           email: '',
           pincode: '',
           flat: '',
           street: '',
           area: '',
           town: '',
           state: '',
        },
        isAddressChanging: false
     }
  },
  computed: {
     isAddressFilled() {
        return this.$store?.getters?.getCheckoutAddress;
     },
     userAddress() {
        return this.$store?.getters?.getUserAddress;
     },
     btnValue() {
        return this.isAddressChanging ? 'Close' : 'Change';
     }
  },
  watch: {
     address: {
        deep: true,
        handler() {
           for(let key in this.errorMsgs) {
              this.errorMsgs[key] = '';
            }
        }
     },
     userAddress: {
        deep: true,
        immediate: true,
        handler(oldValue, newValue) {
           for(let key in this.userAddress) {
              this.address[key] = this.userAddress[key]
           }
           if(oldValue && oldValue.name){
              this.$store.dispatch('setDeliveryStatus');
           }
        }
     }
  },
  methods: {
     getInputValue(data) {
        this.address[data.fieldLabel] = data.value;
     },
     submitAddressData() {
        const isMailValid = window?.globalFun?.util?.emailValidation(this.address.email);
        const isPinValid = (this.address.pincode.length === 6)
        let flag = false;
        for(let key in this.address) {
           if(!this.address[key]) {
               this.errorMsgs[key] = 'Please enter correct value';
               flag = true;
               return;
           }
        }
        if(!isMailValid) {
           this.errorMsgs.email = 'Email must contain @ character';
        }
        if(!isPinValid) {
           this.errorMsgs.pincode = 'Pincode must be 6 characters long';
        }
        if(isMailValid && !flag) {
              this.$store.dispatch('setUserBillingAddress', { type: 'Billing', data: this.address })
              this.isAddressChanging = false;
         }
     },
     showForm() {
        this.isAddressChanging = !this.isAddressChanging
     }
  }
   
}
</script>
