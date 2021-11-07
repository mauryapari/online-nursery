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
            class="input-field__elem "
            :class="{ 'input-error__highlight': errorMsg }" 
            :placeholder="fieldPlaceholder"
            :disabled="isDisabled" 
            :value="value" 
            @input="onValueEnter">
        <div v-if="errorMsg" class="input-error__message" role="alert" v-html="errorMsg"></div>
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
        preventAlphabet(e) {
             if (this.numeric) {
                if (e.keyCode !== 13) { // if not enter
                    // disallow something that is not a number. space is a number. And only 5 numbers needs to be present
                    if (isNaN(Number(e.key)) || e.key === ' ') {
                        e.preventDefault();
                    }
                }
            }
        },

        onValueEnter(e) {
            this.inputValue = e.target.value;
            const value = {
                fieldLabel: this.fieldLabel,
                value: e.target.value
            }
            this.$emit('onChange', value);
        }
    }
}
</script>

<style lang="scss" scoped>
.input-error {
    @include element(message) {
        margin-top: 10px;
        color: red;
    }

    @include element(highlight) {
        border: 1px solid red !important;
    }
}
</style>