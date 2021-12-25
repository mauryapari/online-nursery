const checkoutStore = {
   state: {
      hasAddress: true,
      showDeliveryStatus: false,
      showReviewDetails: false,
      address: '',
      showPayment: false
   },
   getters: {
      getCheckoutAddress(state) {
         return state.hasAddress
      },
      getDeliveryStatus(state) {
         return state.showDeliveryStatus
      },
      getReviewDetails(state) {
         return state.showReviewDetails;
      },
      getUserAddress(state) {
         return state.address;
      },
      getShowPayment(state) {
         return state.showPayment;
      }
   },
   mutations: {
      setAddress(state, payload) {
         state.address = payload.data
         state.showDeliveryStatus = !state.showDeliveryStatus
         state.showPayment = false
      },
      showReviewStatus(state) {
         state.showReviewDetails = !state.showReviewDetails;
      },
      showPayment(state) {
         state.showPayment = !state.showPayment;
      }
   },
   actions: {
      setUserBillingAddress(context, payload) {
         // set mail address
         context.commit('setAddress', payload);
      },
      showReviewStatus(context) {
         context.commit('showReviewStatus');
      },
      showPayment(context) {
         context.commit('showPayment');
      }
   }
};

export default checkoutStore;