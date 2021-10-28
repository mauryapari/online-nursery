<template>
    <div class="card-container">
        <div class="card-container__img-wrapper">
            <slot name="card-image"></slot>
        </div>
        <div class="card-container__text-wrapper">
            <slot name="card-text"></slot>
        </div>
        <div class="card-container__desc-wrapper">
            <slot name="card-description"></slot>
        </div>
        <div class="card-container__footer" v-if="isFooter">
            <slot name="card-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isFooter: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container {
    @include element(img-wrapper) {

    }

    @include element(text-wrapper) {
        text-align: center;
    }

    @include element(desc-wrapper) {
        text-align: center;
    }
}
</style>