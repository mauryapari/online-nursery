<template>
    <div class="home-banner">
        <carousel :isContainerReq="true" 
            @prev="prev()" @next="next()">
            <template>
                <div class="inner">
                    <div class="home-banner__card-container" v-for="i in [currentIndex]" :key="i">
                        <a href="#" class="home-banner__card" ref="carousel-image">
                            <img :src="currentItem.src" :alt="currentItem.alt">
                        </a>
                    </div>
                </div>
            </template>
        </carousel>
    </div>
</template>

<script>
import Carousel from '../../util-content/carousel/Carousel.vue';
export default {
    components: { Carousel },
    data() {
        return {
            cards: [{
                src: require('../../../resources/img/banner-img-1.webp'),
                alt: 'Banner 1'
            }, {
                src: require('../../../resources/img/banner-img-2.webp'),
                alt: 'Banner 2'
            }],
            currentIndex: 0,
            timer: null
        }
    },
    computed: {
        currentItem: function() {
            return this.cards[Math.abs(this.currentIndex) % this.cards.length];
        }
    },
    mounted() {
        this.displayBanner();
     
    },
    methods: {
        displayBanner() {
            this.timer = setInterval(() => {
                this.next();
            }, 3000);
        },
        prev() {
            this.currentIndex -= 1;
            this.timer = 0;
        },
        next() {
            this.currentIndex += 1;
        }
    }
}
</script>

<style lang="scss">
.home-banner {

    @include element(card) {
        img{
            max-width: 100%;
        }
    }
    // @include sm {
    //     .container {
    //         padding-right: initial;
    //         padding-left: initial;
    //     }
    // }
}
</style>