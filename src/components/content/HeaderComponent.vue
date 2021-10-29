<template>
    <div class="header-section container">
        <div class="header-section__navigation-bar">
            <div class="header-section__logo-wrapper">
                <router-link to="/"><img src="../../resources/img/logo.webp" alt="Company Logo"></router-link>
            </div>
            <nav class="header-section__navigation" v-if="!areSmallDevices">
                <ul class="header-section__navigation-list">
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('home')">Home</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('categories')">Categories</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('products')">Products</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('services')">Services</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('contact')">Contact</a></li>
                </ul>
            </nav>
            <div class="header-section__icon-container">
                <span class="icon icon-user"></span>
                <span class="header-section__sign-in">Sign In</span>
                <span>|</span>
                <span class="header-section__log-in">Log In</span>
                <span class="icon icon-cart"></span>
                <span class="icon icon-shopping-bag"></span>
                <span class="icon icon-paragraph-justify" @click="showMobileNavigation" v-if="areSmallDevices"></span>
            </div>
            <div class="header-section__mobile-navigation" v-if="isMobileNavigationVisible">
                  <ul class="header-section__mobile-navigation-list">
                    <li><a class="header-section__mobile-navigation-list-item" @click="scrollMeTo('home')">Home</a></li>
                    <li><a class="header-section__mobile-navigation-list-item" @click="scrollMeTo('categories')">Categories</a></li>
                    <li><a class="header-section__mobile-navigation-list-item" @click="scrollMeTo('products')">Products</a></li>
                    <li><a class="header-section__mobile-navigation-list-item" @click="scrollMeTo('services')">Services</a></li>
                    <li><a class="header-section__mobile-navigation-list-item" @click="scrollMeTo('contact')">Contact</a></li>
                    <li><router-link class="header-section__mobile-navigation-list-item" to="/plant">Plants</router-link></li>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                isMobileNavigationVisible: false
            }
        },
        computed: {
            areSmallDevices() {
                return (this.$store?.getters?.isMobile || this.$store?.getters?.isSmallTablet);
            }
        },
        methods: {
            scrollMeTo(refName) {
                const element = this.$parent.$children.find((item) => item.$refs[refName]);
                console.log(element);
                var top = element?.$el?.offsetTop;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
                this.isMobileNavigationVisible = false;
            },
            showMobileNavigation() {
                this.isMobileNavigationVisible = !this.isMobileNavigationVisible;
            }
        },
    }
</script>
<style lang="scss" scoped>
.header-section {
    padding-top: 15px;
    @include element(navigation-bar) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    @include element(logo-wrapper) {
        img{
            max-width: 250px;
            max-height: 95px;
        }
    }
    @include element(navigation-list) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @include element(navigation-list-item) {
        display: inline-block;
        margin: 0px 10px;
        font-size: 18px;
        font-weight: 500;
        line-height: 28px;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
            color: $brand-green;
        }
    }
    @include element(icon-container) {
        span.icon {
            padding: 0px 5px;
            font-size: 18px;
        }
    }
    @include element(mobile-navigation) {
        position: absolute;
        right: 15px;
        background-color: $white;
        top: 90px;
        z-index: 2;
        border: 1px solid $brand-grey-700;
        padding: 10px;

    }

    @include element(mobile-navigation-list-item) {
        display: inline-block;
        padding-bottom: 10px;
        :last-child {
            padding-bottom: 0px;
        }
    }
}
</style>