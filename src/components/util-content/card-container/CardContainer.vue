<template>
    <div class="card-container" :class="{'card-container--hover': showHoverEffect}">
        <div class="card-container__img-wrapper">
            <slot name="card-image"></slot>
        </div>
        <div class="card-container__text-wrapper">
            <slot name="card-text"></slot>
        </div>
        <div class="card-container__desc-wrapper">
            <slot name="card-description"></slot>
        </div>
        <div class="card-container__footer" v-if="hasFooter">
            <slot name="card-footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        hasFooter: {
            type: Boolean,
            default: false
        },
        showHoverEffect: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;

    @include modifier(hover) {
        &:hover {
            box-shadow: 0 0 17px rgb(23 84 116 / 18%);
        }
    }
}
</style>