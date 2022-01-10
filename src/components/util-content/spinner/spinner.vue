<template>
    <span class="spinner" :class="['spinner--' + theme , 'spinner--'+ size]">
        <span class="spinner__circle spinner__circle--first"></span>
        <span class="spinner__circle spinner__circle--second"></span>
    </span>
</template>

<script>
export default {
   props: {
        theme: {
            type: String,
            default: 'dark'
        },
        size: {
            type: String,
            default: 'sm'
        }
    }
}
</script>

<style lang="scss" scoped>
.spinner {
    display: inline-block;
    position: relative;

    @include element(circle) {
        width: 100%;
        height: 100%;
        border: 2px solid $brand-red;
        position: absolute;
        top: 0;
        left: 0;
        animation: loaderSpin 1.5s infinite ease-in-out;
        display: block;

        @include modifier(second) {
            animation-delay: -0.75s;
        }
    }

    @include modifier(sm) {
        width: 20px;
        height: 20px;
    }

    @include modifier(md) {
        width: 40px;
        height: 40px;
    }

    @include modifier(lg) {
        width: 80px;
        height: 80px;
    }

    @include modifier(dark) {
        .spinner {
            @include element(circle) {
                border-color: $brand-green;
            }
        }
    }
}

@keyframes loaderSpin {
    0% {
        transform: scale(0) rotate(0deg);
    }
    50% {
        transform: scale(1) rotate(180deg);
        border-radius: 50%;
    }
    100% {
        transform: scale(0) rotate(360deg);
    }
}
</style>