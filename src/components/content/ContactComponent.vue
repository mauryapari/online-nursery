<template>
    <div class="contact-form container">
        <section-header headingName="Contact"></section-header>
        <div class="contact-form__form-wrapper">
            <form>
                <fieldset>
                    <div class="contact-form__field-wrappers">
                        <div class="contact-form__input-container">
                            <template v-for="(item, index) in itemArray">
                                <input-component :key="index" 
                                    :fieldLabel="item.fieldLabel"
                                    :fieldPlaceholder="item.fieldPlaceholder"
                                    :value="item.value"
                                    :isRequired="item.isRequired"></input-component>
                            </template>
                        </div>
                        <div class="contact-form__textarea-container">
                            <textarea placeholder="Message"></textarea>
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
import Clickables from '../util-content/clickables/clickables.vue'
import InputComponent from '../util-content/InputComponent/InputComponent.vue'
import SectionHeader from '../util-content/section-header/SectionHeader.vue'
export default {
  components: { SectionHeader, InputComponent, Clickables },
  data() {
      return {
          itemArray: [{
              fieldLabel: 'Name',
              fieldPlaceholder: 'Name',
              isRequired: true,
              value: ''
          }, {
              fieldLabel: 'Mobile Number',
              fieldPlaceholder: 'Mobile Number',
              isRequired: true,
              value: ''
          }, {
              fieldLabel: 'Email ID',
              fieldPlaceholder: 'Email ID',
              isRequired: true,
              value: ''
          }]
      }
  }
}
</script>

<style lang="scss">
.contact-form {
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
    @include element(textarea-container) {
        textarea {
            background-color: #eeeeee;
            border-radius: 8px;
            border: 1px solid #eeeeee;
            box-shadow: none;
            padding: 12px;
            
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
        }
        @include element(textarea-container) {
            padding: 0px 10px;
            flex-basis: 50%;
            textarea {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>