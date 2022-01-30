<template>
    <div>
        <router-view></router-view>
        <component :is="getModalName" v-if="getModalName"></component>
        <toast-message-modal v-if="getIsToastModalVisible"
            :title="getToastModalData.title" 
            :subtitle="getToastModalData.subtitle"
            :iconName="getToastModalData.iconName"
            :type="getToastModalData.type"
        ></toast-message-modal>
    </div>
</template>
<script>
import HomePage from './components/pages/HomePage.vue';
import SigninForm from './components/content/Forms/SigninForm.vue';
import LoginForm from './components/content/Forms/LoginForm.vue';
import ToastMessageModal from './components/util-content/toast-message-modal/ToastMessageModal.vue';
    export default {
      components: {
            HomePage, SigninForm, LoginForm, ToastMessageModal
      },
      computed: {
          getModalName() {
              return this.$store?.getters?.getModalName;
          },
          getUserCartID() {
            return this.$store?.getters?.getUserCartID;
          },
          getToastModalData() {
              return this.$store?.getters?.getToastModalData;
          },
          getIsToastModalVisible() {
              return this.$store?.getters?.getIsToastModalVisible;
          }
      },
      watch: {
          getUserCartID: {
            immediate: true,
            handler() {
            this.$store.dispatch('isCartAvailable');
            }
          },
          getToastModalData: {
            deep: true,
            handler(oldValue, newValue) {
                if(oldValue?.title) {
                    this.callTimer = setTimeout(()=> {
                        this.$store.dispatch('setToastModalData', { action: false, data: {} })
                    }, 5000);
                }
            }
          }
      },
      mounted() {
          this.$store.dispatch('isUserRegistered');
      }
    };
</script>
