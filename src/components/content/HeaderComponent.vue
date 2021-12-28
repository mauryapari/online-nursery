<template>
    <div class="header-section container">
        <div class="header-section__navigation-bar">
            <div class="header-section__logo-wrapper">
                <router-link to="/" exact><img src="../../resources/img/logo.webp" alt="Company Logo"></router-link>
            </div>
            <nav class="header-section__navigation" v-if="!areSmallDevices">
                <ul class="header-section__navigation-list">
                    <li><router-link class="header-section__navigation-list-item" to="/" exact>Home</router-link></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('categories')">Categories</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('products')">Products</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('services')">Services</a></li>
                    <li><a class="header-section__navigation-list-item" @click="scrollMeTo('contact')">Contact</a></li>
                    <li><router-link class="header-section__navigation-list-item" to="/plant">Plants</router-link></li>
                </ul>
            </nav>
            <div class="header-section__icon-container">
                <span class="icon icon-user" @click="showUserInfo" v-if="isMobile && !isUserLoggedIn"></span>
                <span class= "header-section__mobile-user" v-if="isUserInfoVisible && !isUserLoggedIn">
                    <ul class="header-section__mobile-user-list">
                        <li><a href="#" class="header-section__mobile-user-list-item" @click.prevent="showModal('login-form')">Login</a></li>
                        <li><a href="#" class="header-section__mobile-user-list-item" @click.prevent="showModal('signin-form')">Sign In</a></li>
                    </ul>
                </span>
                <span v-if="!isMobile && !isUserLoggedIn">
                    <span class="header-section__sign-in" @click.prevent="showModal('signin-form')">Sign In</span>
                    <span>|</span>
                    <span class="header-section__log-in" @click.prevent="showModal('login-form')">Log In</span>
                </span>
                <span class="header-section__account-info" @click="showAccountInfo"  v-if="isUserLoggedIn">
                    <span class="icon icon-user" v-if="isMobile"></span>
                    <span class="header-section__log-in">Hi {{ this.getUserName }}
                        <span class="header-section__account-navigation" v-if="isAccountInfoVisible">
                            <ul class="header-section__mobile-navigation-list">
                                <li><a href="#" class="header-section__mobile-navigation-list-item">Account</a></li>
                                <li><a href="#" class="header-section__mobile-navigation-list-item" @click="logout">Sign Out</a></li>
                            </ul>
                        </span>
                    </span>
                </span>
                <span class="icon icon-cart"></span>
                <span class="header-section__cart-container">
                    <router-link to="/cart"><span class="icon icon-shopping-bag"></span></router-link>
                    <span class="header-section__cart-item-count-bg" v-if="getCartItems">
                        <span class="header-section__cart-item-count">{{getCartItems}}</span>
                    </span>
                </span>
                <span class="icon icon-paragraph-justify" @click="showMobileNavigation" v-if="areSmallDevices"></span>
            </div>
            <div class="header-section__mobile-navigation" v-if="isMobileNavigationVisible">
                  <ul class="header-section__mobile-navigation-list">
                    <li><router-link class="header-section__mobile-navigation-list-item" to="/" exact>Home</router-link></li>
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
                isMobileNavigationVisible: false,
                isUserInfoVisible: false,
                isAccountInfoVisible: false
            }
        },
        computed: {
            isMobile() {
                return this.$store.getters?.isMobile;
            },
            areSmallDevices() {
                return (this.$store?.getters?.isMobile || this.$store?.getters?.isSmallTablet);
            },
            isUserLoggedIn() {
                return this.$store?.getters?.getUserLoggedIn;
            },
            getCartItems() {
                return this.$store?.getters?.getCartItems;
            },
            getUserName() {
                let name = this.$store?.getters?.getUserDetails?.users;
                    name = name?.length ? name[0]?.displayName : '';
                return  name;
            }
        },
        methods: {
            scrollMeTo(refName) {
                const element = this.$parent.$children.find((item) => item.$refs[refName]);
                if(!element) {
                    this.$router.push('/');
                    // return;
                    // const ele = this.$parent.$children.find((item) => item.$refs[refName]);
                }
                var top = element?.$el?.offsetTop;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
                this.isMobileNavigationVisible = false;
            },
            showMobileNavigation() {
                this.isMobileNavigationVisible = !this.isMobileNavigationVisible;
                if(this.isUserInfoVisible) {
                    this.isUserInfoVisible = false;
                }
            },
            showUserInfo() {
                if(this.isMobile) {
                    this.isUserInfoVisible = !this.isUserInfoVisible;
                    if(this.isMobileNavigationVisible) {
                        this.isMobileNavigationVisible = false;
                    }
                }
            },
            showAccountInfo() {
                this.isAccountInfoVisible = !this.isAccountInfoVisible;
                if(this.isMobileNavigationVisible) {
                    this.isMobileNavigationVisible = false;
                }
            },
            showModal(value) {
                this.$store.dispatch('setModalName', value);
            },
            logout() {
                window?.globalFun?.util.setCookie('auth-token', '', 0,'/');
                window?.globalFun?.util.setCookie('user-id', '', 0,'/');
                window?.globalFun?.util.setCookie('cart-id', '', 0,'/');
                this.$store.dispatch('removeLocalCartItem'); // Adding removeLocalCartItem so that items in cart in database are not removed on logout.
                this.$store.dispatch('logoutUser');
                this.$store.dispatch('removeUserInfo');
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
            max-width: 150px;
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
        position: relative;
        display: flex;
        align-items: center;
        span.icon {
            padding: 0px 5px;
            font-size: 22px;
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

        &:hover {
            cursor: pointer;
            color: $brand-green;
        }
    }

    @include element(mobile-user) {
        position: absolute;
        left: 5px;
        background-color: $white;
        top: 25px;
        z-index: 2;
        border: 1px solid $brand-grey-700;
        padding: 10px;

    }

    @include element(mobile-user-list-item) {
        display: inline-block;
        padding-bottom: 10px;
        :last-child {
            padding-bottom: 0px;
        }
        
        &:hover {
            cursor: pointer;
        }
    }
    
    @include element(sign-in) {
        font-size: 18px;
        &:hover {
            cursor: pointer;
            color: $brand-green;
        }

        &:active {
            color: $brand-green;
        }
    }

    @include element(log-in) {
        font-size: 18px;
        &:hover {
            cursor: pointer;
            color: $brand-green;
        }

        &:active {
            color: $brand-green;
        }
    }

    @include element(account-info) {
        position: relative;
    }

    @include element(account-navigation) {
        position: absolute;
        right: 0px;
        background-color: $white;
        top: 25px;
        z-index: 2;
        border: 1px solid $brand-grey-700;
        padding: 10px;
        width: max-content;

    }
    .router-link-active {
        color: $brand-green;
    }

    @include element(cart-container) {
        position: relative;
    }

    @include element(cart-item-count-bg) {
        &::before {
            content: '';
            background-color: $brand-red;
            border-radius: 50%;
            display: block;
            position: absolute;
            height: 18px;
            width: 18px;
            top: 11px;
            right: 0px;
        }
    }
    @include element(cart-item-count) {
        font-size: 14px;
        color: $white;
        position: absolute;
        top: 11px;
        right: 6px;
    }

    @include sm {
       
         @include element(logo-wrapper) {
            img{
                max-width: 250px;
                max-height: 95px;
            }
        }
    }
}
</style>