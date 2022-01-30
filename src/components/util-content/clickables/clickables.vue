<template>
    <component 
        class="btn item-clickable"
        ref="elem"
        :class="['btn--' + btnType, 'btn--' + btnSize, {'btn--disabled': isBtnDisabled, 'item-clickable--has-spinner': isLoading, 'item-clickable--transparent': transparent}]"
        :disabled="isBtnDisabled"
        :is="componentTag">
        <span class="item-clickable__text">
            <slot></slot>
        </span>
        <!-- <transition name="fade-quick">
            <span class="item-clickable__loader" v-if="isLoading">
                <item-spinner :theme="btnType !== 'primary' ? 'dark' : 'light'" :size="'sm'"></item-spinner>
            </span>
        </transition> -->
    </component>
</template>

<script>
export default {
     props: {
        btnType: {
            type: String,
            default: 'primary'
        },
        btnSize: {
            type: String,
            default: 'lg'
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        isLink: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            default: null
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
        isDownloadable: {
            type: Boolean,
            default: false
        },
        targetValue: {
            type: String,
            default: '_self'
        }
    },
    computed: {
        isBtnDisabled() {
            return this.isDisabled;
        },
        componentTag() {
            return this.isLink ? 'a' : 'button';
        }
    },
    mounted() {
        const $curElem = this.$refs.elem;
        this.$nextTick(() => {
            if ($curElem) {
                if (this.isLink) {
                    const href = $curElem.getAttribute('href');
                    const newHref = href || this.href || '#';
                    $curElem.setAttribute('href', newHref);
                    $curElem.setAttribute('target', this.targetValue);
                }

                if (this.isDownloadable) {
                    $curElem.setAttribute('download', 'download');
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.item-clickable {
    position: relative;
    overflow: hidden;
    border: none;
    @include element(text) {
        display: block;
        text-align: center;
        transition: all 0.2s;
        @include ralewayRegular;

        * {
            pointer-events: none;
        }
    }

    @include element(loader) {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        transition: all 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @include modifier(has-spinner) {
        .item-clickable {
            @include element(text) {
                opacity: 0;
                transform: translateY(-100%);
            }
        }
    }

    @include modifier('transparent') {
        background: none;
        border: none;

        &:focus, &:hover {
            background-color: transparent;
        }
    }
}
</style>