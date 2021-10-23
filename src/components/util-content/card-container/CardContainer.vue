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
    </div>
</template>

<style lang="scss" scoped>
.card-container {
    @include element(img-wrapper) {

    }

    @include element(text-wrapper) {
        text-align: center;
    }

    @include element(desc-wrapper) {
        text-align: justify;
    }
}
</style>