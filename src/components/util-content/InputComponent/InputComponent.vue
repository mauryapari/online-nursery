<template>
    <div class="input-field__container input-error" :class="{'input-error--show': errorMsg || showErrorMsg}">
        <div class="input-field__label-container">
            <label :for="inputFieldId" class="input-field__label input-error__label"
                :class="{'input-field__label--required': isRequired}">{{fieldLabel}}</label>
        </div>
        <input 
            @keypress="preventAlphabet"
            ref="inputField"
            :id="inputFieldId" 
            :name="fieldLabel" 
            class="input-field__elem input-error__highlight" 
            :placeholder="fieldPlaceholder"
            :disabled="isDisabled" 
            :value="value" 
            @input="onValueEnter">
        <!-- <div v-if="errorMsg" class="input-error__message" role="alert" v-html="errorMsg"></div>
        <div v-if="showErrorMsg" class="input-error__message" role="alert">
            <slot name="error-msgs"></slot>
        </div>   -->
    </div>
</template>

<script>
export default {
    props: {
        fieldLabel: {
            type: String,
            default: ''
        },
        fieldPlaceholder: {
            type: String,
            default: ''
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        },
        errorMsg: {
            type: String,
            default: ''
        },
        maxLength: {
            type: Number,
            default: 0
        },
        numeric: {
            type: Boolean,
        }
    },
    data() {
        return {
            inputFieldId: `mcpInput${Math.floor(Math.random() * 1000)}${this.fieldLabel}`,
            showErrorMsg: false,
            inputValue: ''
        }
    },
    methods: {
        preventAlphabet() {

        },

        onValueEnter() {

        }
    }
}
</script>

<style lang="scss" scoped>

</style>