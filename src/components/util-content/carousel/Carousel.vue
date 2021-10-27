<template>
    <div class="carousel" :class="{container: isContainerReq}">
        <span @click="prev" class="icon icon-cart"></span>
            <slot></slot>
        <span @click="next" class="icon icon-forward"></span>
    </div>
</template>

<script>
export default {
    props: {
        isContainerReq: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        prev() {
            this.$emit('prev');
        },
        next() {
            this.$emit('next');
        }
    }
}
</script>

<style lang="scss" scoped>
.carousel {
    position: relative;
    .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: $white;
        width: 40px;
        height: 40px;
        border-radius: 50px;
        &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        box-shadow: 0 2px 8px 0 rgb(0 0 0 / 30%);
    }
    .icon-forward {
        right: 50px;
    }
    .icon-cart {
        left: 50px;
    }
}
</style>