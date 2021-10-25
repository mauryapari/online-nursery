<template>
    <div class="home-banner">
        <carousel :isContainerReq="true" 
            @prev="prev(-1)" @next="next(1)">
            <template>
                <div class="inner">
                    <div class="home-banner__card-container" v-for="(card, index) in cards" :key="index">
                        <a href="#" class="home-banner__card" ref="carousel-image">
                            <img :src="card.src" :alt="card.alt">
                        </a>
                    </div>
                </div>
            </template>
        </carousel>
    </div>
</template>

<script>
import Carousel from '../util-content/carousel/Carousel.vue';
export default {
    components: { Carousel },
    data() {
        return {
            cards: [{
                src: require('../../resources/img/banner-img-1.webp'),
                alt: 'Banner 1'
            }, {
                src: require('../../resources/img/banner-img-2.webp'),
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
.home-banner {
    @include element(card) {
        img{
            max-width: 100%;
        }
    }
}
</style>