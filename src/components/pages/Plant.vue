<template>
    <div>
      <header-component></header-component>
      <div class="background-page">
         <section-component :hasBreadCrumb="true">
            <template slot="page-breadcrumb">
               <breadcrumb-component></breadcrumb-component>
            </template>
            <template slot="page-content">
               <div class="plant-detail">
                  <div class="plant-detail__wrapper">
                     <div class="plant-detail__image-section">
                        <div class="plant-detail__image-wrapper">
                           <img :src="getPlantData.imgpath" :alt="getPlantData.itemname"/>
                        </div>
                     </div>
                     <div class="plant-detail__description-section">
                        <div class="plant-detail__name-wrapper">
                           <h1>{{getPlantData.itemname}}</h1>
                        </div>
                        <div class="plant-detail__price-wrapper"><p v-html="getPlantPrice"></p></div>
                        <div class="plant-detail__delivery-wrapper">
                           <div class="plant-detail__delivery-title">Delivery</div>
                           <div class="plant-detail__delivery-desc">
                              <div class="plant-detail__pincode-form">
                                 <input-component 
                                    :showFieldLabel="false"
                                    :fieldLabel="'Pincode'"
                                    :fieldPlaceholder="'Enter Pincode'"
                                    :errorMsg="pincodeErrorMsg"
                                    @onChange="getInputValue"></input-component>
                                 <clickables class="plant-detail__pincode-check" :btnSize="'sm'" :btnType="'tertiary'">{{'Check'}}</clickables>
                              </div>
                           </div>
                        </div>
                        <div class="plant-detail__cta-wrapper">
                           <clickables :btnSize="'lg'" :btnType="'secondary'" @click.native="buyProduct()">{{'Add to Cart'}}</clickables>
                           <clickables :btnSize="'lg'" :btnType="'secondary'" @click.native="buyProduct('now')">{{'Buy Now'}}</clickables>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </section-component>
         <similar-products-component></similar-products-component>
      </div>
    </div>
</template>
<script>
import BreadcrumbComponent from '../content/BreadcrumbComponent.vue';
import HeaderComponent from '../content/HeaderComponent.vue';
import Clickables from '../util-content/clickables/clickables.vue';
import InputComponent  from '../util-content/InputComponent/InputComponent.vue';
import SimilarProductsComponent from '../content/SimilarProductsComponent.vue';
import SectionComponent from '../util-content/page-background/SectionComponent.vue';
export default {
  components: { HeaderComponent, BreadcrumbComponent, Clickables, InputComponent, SimilarProductsComponent, SectionComponent },
  data() {
     return {
        pincodeErrorMsg: ''
     }
  },
  computed: {
     getPlantData() {
        return this.$store?.getters?.getPlantDetail;
     },
     getPlantPrice() {
        return this.getPlantData && this.getPlantData.offerprice && this.getPlantData.offerprice[0];
     }
  },
  mounted() {
     this.fetchUrlPlantData();
  },
  methods: {
     fetchUrlPlantData() {
        const id = this.$route?.params?.id;
        const data = window?.globalFun?.util?.getPlantDetail(id);
        this.$store.dispatch('setPlantDetail', data); 
     },
     getInputValue(data) {
        // write code to check pincode
      //   Please Enter a Valid Pincode
     },
     buyProduct(val) {
        this.$store.dispatch('addToCart', { payload: this.getPlantData, quantity: 2 });
        if(val === 'now') {
           this.$router.push('/cart');
        }
     }
  }
}
</script>

<style lang="scss">
.plant-detail {
   margin: 20px 0px;
   @include element(wrapper) {
      display: flex;
   }

   @include element(image-section) {
      flex-basis: 35%;
   }

   @include element(image-wrapper) {
      flex-basis: 35%;
      padding: 20px;
      img {
         border: 1px solid $brand-grey-200;
         width: 100%;
      }
   }

   @include element(description-section) {
      flex-basis: 65%;
      padding: 20px 0px;
      border-left: 1px solid $brand-grey-200;
   }

   @include element(name-wrapper) {
      padding: 0px 20px;
      h1 {
         font-size: 24px;
         color: $brand-grey-600;
         line-height: 1.2;
         word-wrap: break-word;
         font-weight: 400;
         padding-right: 35px;
         padding-top: 5px;
      }
   }
   @include element(price-wrapper) {
      padding: 20px 20px 30px;
      font-size: 28px;
      font-weight: 500;
      line-height: 25px;
   }

   @include element(delivery-wrapper) {
      display: flex;
      background-color: $brand-grey-100;
      align-items: center;
      padding: 20px;
      margin-bottom: 40px;
   }

   @include element(delivery-title) {
      flex-basis: 25%;
   }

   @include element(delivery-desc) {
      flex-basis: 75%;
   }

   @include element(pincode-check) {
      border-radius: 0px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      height: 40px;
      margin-top: 0;
      font-size: 15px;
      font-weight: 500;
   }

   @include element(pincode-form) {
      display: flex;
      input {
         width: 180px;
         height: 40px;
         font-size: 16px;
         &::placeholder {
            padding: 10px;
         }
      }
   }

   @include element(cta-wrapper) {
      button {
         width: 200px;
         margin-left: 20px;
      }
   }
}
</style>