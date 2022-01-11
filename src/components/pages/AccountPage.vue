<template>
    <div>
      <header-component></header-component>
      <account-page-component></account-page-component>
      <footer-component></footer-component>
    </div>
</template>
<script>
import HeaderComponent from '../content/HeaderComponent.vue';
import AccountPageComponent from '../content/AccountPageComponents/AccountPageComponent.vue';
import FooterComponent from '../content/FooterComponent.vue';
export default {
  components: { HeaderComponent, FooterComponent, AccountPageComponent },
}
</script>

<style lang="scss">
.account-page {

  @include modifier(has-spinner) {
    display: block;
    text-align: center;
  }

  @include element(user) {
    margin-top: 20px;
    padding: 20px;
    text-align: center;
  }

  @include element(user-pic-container) {
    width: 150px;
    height: 150px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background-color: $brand-grey-100;
    border-radius: 50%;
    margin: 30px 0px;

    img {
        max-width: 100%;

    }
  }

  @include element(user-description) {
    margin: 0px 0px 30px;
    font-size: 24px;
    font-weight: 500;
  }

  @include element(options-list) {
    display: flex;

  }

  @include element(options-item) {
    padding: 10px 0px;
    width: 20%;
    border-radius: 4px;
    .icon {
        padding-right: 10px;
    }
    a {
        display: inline-block;
        font-size: 20px;
        
    }
    &:hover {
        box-shadow: 0 2px 10px rgb(0 0 0 / 25%);
    }
  }

  /** Scss for User Address*/
  @include element(address) {
    margin-top: 30px;
    padding: 20px;
  }

  @include element(delivery-method) {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 10px;
    line-height: 30px;
  }

  @include element(user-name) {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }

  @include element(user-address) {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }

  /**Order Page Scss */
  @include element(order) {
    margin-top: 30px;
    padding: 20px;
  }


  @include element(profile) {
    margin-top: 30px;
    padding: 20px;
  }

  @include element(user-detail) {
    display: flex;
    margin: 15px 0px;
  }

  @include element(user-label) {
    font-size: 18px;
    font-weight: 500;
    min-width: 80px;
  }

  @include element(user-value) {
    font-size: 18px;
  }

}
</style>
