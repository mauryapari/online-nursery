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
    flex-direction: column;
    align-items: center;
  }

  @include element(options-item) {
    padding: 10px 0px;
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

  @include element(order-items) {
    border-bottom: 1px dotted $brand-grey-700;
  }

  @include element(order-header) {
    padding: 20px 20px 10px;
    background-color: $brand-grey-100;
    margin: 15px 0px;
    

    .label-txt {
      display: inline-block;
      font-weight: 500;
      color: $brand-grey-600;
      margin-bottom: 10px;
    }
    .label-value {
      font-weight: 700;
      font-size: 16px;
    }
  }

  @include element(order-id) {
    margin-bottom: 10px;
  }

  @include element(order-amount) {
    margin-bottom: 10px;
  }

  @include element(order-status) {
    margin-bottom: 10px;
  }

  @include element(order-details) {
    margin-top: 30px;
  }

  @include element(order-details-item) {
    
  }

  @include element(order-details-header) {
    background-color: $brand-grey-100;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    align-items: center;

    .label-txt {
      font-size: 16px;
      font-weight: 500;
    }
    
    .label-value {
      font-size: 14px;
      font-weight: 700;
    }
  }

  @include element(order-id) {
    display: flex;
  }

  @include element(order-id-info) {
    padding-right: 10px;
  }

  @include element(order-info-holder) {
    padding: 25px 15px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &::after {
      content: '';
      width: 100%;
      border-bottom: 1px dotted $brand-grey-700;
      padding-top: 10px;
    }
  }

  @include element(details-title) {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 18px;
  }

  @include element(address-detail-holder) {
    width: 50%;
  }

  @include element(order-summary-holder) {
    width: 100%;
  }

  @include element(payment-detail-holder) {
    width: 50%;
  }

  @include element(order-summary-body) {
  }

  @include element(order-summary-item) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @include element(grand-total) {
    border-top: 1px dotted $brand-grey-700;
    padding-top: 5px;
  }


  @include element(details-btn) {
    .btn {
      padding: 4px 24px;
      background: transparent;
      border: 1px solid $brand-green;
      color: $brand-green;
      &:hover {
        color: $white;
        background: $brand-green;
      }
    }
  }

  @include element(payment-method) {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 18px;
  }

  @include element(details-header) {
    margin: 10px 0px;
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
  }

  @include element(order-item-detail) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 15px;

    &:last-child {
      padding-bottom: 30px;
    }
  }

  @include element(product-info) {
    display: flex;
    align-items: flex-end;
    width: 50%;
  }

  @include element(product-name) {
    margin: 0;
  }

  @include element(image-container) {
    width: 50px;
    height: 50px;
    border: 1px solid $brand-grey-200;
    margin-right: 10px;
    img {
      max-width: 100%;
    }
  }

  /**For larger screens */
  @include sm {
    @include element(options-list) {
      flex-direction: row;
    }

    @include element(options-item) {
      width: 20%;
    }

    @include element(address-detail-holder) {
      width: 33.3%;

    }

    @include element(order-summary-holder) {
      width: 33.3%;

    }

    @include element(payment-detail-holder) {
      width: 33.3%;
     }
  }

  @include md {
    @include element(order-header) {
      display: flex;
      justify-content: space-between;
    }
   
   @include element(details-btn) {
      float: right;
    }

    @include element(order-id) {
      margin: 0;
    }

    @include element(order-amount) {
      margin: 0;

    }

    @include element(order-status) {
      margin: 0;
    }
  }
}
</style>
