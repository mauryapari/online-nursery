<template>
    <div class="carousel" :class="{container: isContainerReq}">
        <span @click="prev(-1)" class="icon icon-cart"></span>
            <div class="inner" v-if="isBanner">
                <div class="carousel__card-container" v-for="(card, index) in cards" :key="index">
                    <a href="#" class="carousel__card" ref="carousel-image"><img :src="card.src" :alt="card.alt"></a>
                </div>
            </div>
            <slot name="banner-carousel"></slot>
            <slot name="card-carousel"></slot>
        <span @click="next(1)" class="icon icon-forward"></span>
    </div>
</template>

<script>
export default {
    props: {
        isContainerReq: {
            type: Boolean,
            default: false
        },
        isBanner: {
            type: Boolean,
            default: false
        },
        
    },
    data() {
        return {
            cards: [{
                src: require('../../../resources/img/banner-img-1.webp'),
                alt: 'Banner 1'
            }, {
                src: require('../../../resources/img/banner-img-2.webp'),
                alt: 'Banner 1'
            }],
            slide_index: 1,
            timer: null
        }
    },
    mounted() {
        this.displayBanner(1);
        this.timer = setInterval(() => {
            this.next(1);
        }, 3000);
    },
    methods: {
        displayBanner(n) {
            var slides = this.$refs['carousel-image'];
            if (n > slides.length) { 
                this.slide_index = 1; 
            }  
            if (n < 1) {
                 this.slide_index = slides.length;
            } 
            for (let i=0; i<slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slides[this.slide_index - 1].style.display = "block";   
        },
        prev(n) {
            this.displayBanner(this.slide_index += n);
            this.timer = 2000;
        },
        next(n) {
            this.displayBanner(this.slide_index += n);
            this.timer = 2000;
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
    @include element(card) {
        img{
            max-width: 100%;
        }
    }
}
</style>