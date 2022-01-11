<template>
   <div class="empty-card">
      <card-container :hasFooter="true">
         <template slot="card-image">
            <img :src="imgSrc" :alt="altText"/>
         </template>
         <template slot="card-text">
            <h1 class="empty-card__title" v-html="heading"></h1>
         </template>
         <template slot="card-description">
            <p class="empty-card__description" v-html="subHeading"></p>
         </template>
         <template slot="card-footer">
               <div class="empty-card__card-footer">
                  <clickables :btnSize="'lg'" :btnType="'secondary'" :isLink="true" :href="'/'">{{'Start Shopping'}}</clickables>
               </div>
         </template> 
      </card-container>
   </div>
</template>

<script>
import CardContainer from '../util-content/card-container/CardContainer.vue';
import Clickables from '../util-content/clickables/clickables.vue';
export default {
   components: { CardContainer, Clickables},
   props: {
      imgSrc: {
         type: String,
         default: ''
      },
      altText: {
         type: String,
         default: ''
      },
      heading: {
         type: String,
         default: ''
      },
      subHeading: {
         type: String,
         default: ''
      }
   }
}
</script>


<style lang="scss">
.empty-card {
   margin-right: auto;
   margin-left: auto;
   margin-top: 30px;
   .card-container {
      text-align: center;
   }

   @include element(title) {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
   }

   @include element(description) {
      font-size: 14px;
      margin-bottom: 15px;
   }

   @include element(card-footer) {
      .btn {
         margin: 20px 0px 80px;
         color: $white;
      }
   }
}
</style>