<template>
    <div class="contact-form container" ref="contact">
        <section-header headingName="Contact"></section-header>
        <div class="contact-form__form-wrapper">
            <form @submit.prevent="submitContactData">
                <fieldset>
                    <legend>Enter data for you query</legend>
                    <div class="contact-form__field-wrappers">
                        <div class="contact-form__input-container">
                            <template v-for="(item, index) in itemArray">
                                <input-component :key="index" 
                                    :fieldLabel="item.fieldLabel"
                                    :fieldPlaceholder="item.fieldPlaceholder"
                                    :value="item.value"
                                    :isRequired="item.isRequired"
                                    :errorMsg="item.errorMsg"
                                    @onChange="getInputValue"></input-component>
                            </template>
                        </div>
                        <div class="contact-form__textarea-container">
                            <label for="message">Message</label>
                            <textarea id="message" placeholder="Message"></textarea>
                        </div>
                    </div>
                </fieldset>
                <div class="contact-form__submit-btn">
                    <clickables>{{'Submit'}}</clickables>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Clickables from '../../util-content/clickables/clickables.vue'
import InputComponent from '../../util-content/InputComponent/InputComponent.vue'
import SectionHeader from '../../util-content/section-header/SectionHeader.vue'
export default {
  components: { SectionHeader, InputComponent, Clickables },
  data() {
      return {
          itemArray: [{
              fieldLabel: 'Name',
              fieldPlaceholder: 'Name',
              isRequired: true,
              value: '',
              errorMsg: '',
              type: 'text'
          }, {
              fieldLabel: 'Mobile Number',
              fieldPlaceholder: 'Mobile Number',
              isRequired: true,
              value: '',
              errorMsg: '',
              type: 'tel'
          }, {
              fieldLabel: 'Email ID',
              fieldPlaceholder: 'Email ID',
              isRequired: true,
              value: '',
              errorMsg: '',
              type: 'email'
          }],
      }
    },
    watch: {
        itemArray: {
            deep: true,
            handler() {
                this.isFormTouched();
            }
        },
    },
    methods: {
        isFormTouched() {
            this.itemArray.forEach((item) => {
                if(item.value) {
                    item.errorMsg = '' 
                }
            })
        },
        checkFormData() {
            let flag = true;
            this.itemArray.forEach((item) => {
                if (item.isRequired && !item.value) {
                    item.errorMsg = `Please fill correct value in ${item.fieldLabel}.`;
                    flag = false;
                } else if(!this.checkData(item)){
                    item.errorMsg = 'Value is wrong';
                    flag = false;
                }
            });
            return flag;
        },
        submitContactData() {
            const isDataCorrect = this.checkFormData();
            if(isDataCorrect) {
                let formData = {}
                this.itemArray.forEach((item) => {
                    formData[`${item.fieldLabel}`] = item.value
                })
                const modalData = {
                  action: true,
                  data: {
                     title: 'Server Error Occured',
                     subtitle: '',
                     type: 'error',
                     iconName: 'warning'
                  }
               }
               this.$store.dispatch('setToastModalData', modalData);
            }
        },
        getInputValue(val) {
            const item = this.itemArray.find((item) => {
                return item.fieldLabel === val.fieldLabel;
            });
            item.value = val.value;
        },
        checkData(item) {
            const inputType = item.type;
            const value = item.value;
            switch(inputType) {
                case 'email': {
                    return window?.globalFun?.util?.emailValidation(value); //reg.test(value);
                }

                case 'tel': {
                    return window?.globalFun?.util?.telValidation(value); 
                }
                default: {
                    if(value) {
                        return true;
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
.contact-form {
    padding-top: 40px;
    padding-bottom: 40px;
    legend {
        display: none;
    }
    @include element(form-wrapper) {
        max-width: 992px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 20px;
    }

    @include element(field-wrappers) {
        display: flex;
        flex-direction: column;
    }

    @include element(input-container) {
        margin-bottom: 30px;
        .input-field {
            @include element(container) {
                input {
                    width: 100%;
                    height: 50px;
                    background-color: $brand-grey-300;
                    border-radius: 8px;
                    border: 1px solid $brand-grey-300;
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
    @include element(textarea-container) {
        label {
            display: none;
        }
        textarea {
            background-color: $brand-grey-300;
            border-radius: 8px;
            border: 1px solid $brand-grey-300;
            box-shadow: none;
            padding: 12px;
            width: 100%;
            height: 200px;
            
            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    @include element(submit-btn) {
        text-align: center;
        margin-top: 30px;
    }

    @include sm {
         @include element(field-wrappers) {
            flex-direction: row;
        }
        @include element(input-container) {
            flex-basis: 50%;
            padding: 0px 10px;
            margin-bottom: 0px;
        }
        @include element(textarea-container) {
            padding: 0px 10px;
            flex-basis: 50%;
            height: auto;
            textarea {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>