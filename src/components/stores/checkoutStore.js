const apiConfig = require('../config');
import router from '../router';

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
      isUserAddressPresent(state) {
         return state.address;
      },
      getShowPayment(state) {
         return state.showPayment;
      }
   },
   mutations: {
      setAddress(state, payload) {
         state.address = payload.data
         state.showDeliveryStatus = true
         state.showPayment = false
      },
      showReviewStatus(state, payload) {
         state.showReviewDetails = payload;
      },
      showPayment(state) {
         state.showPayment = !state.showPayment;
      }
   },
   actions: {
      setUserBillingAddress(context, payload) {
         context.commit('setAddress', payload);
      },
      showReviewStatus(context, payload) {
         context.commit('showReviewStatus', payload);
      },
      showPayment(context) {
         context.commit('showPayment');
      },
      setOrderId(context, payload) {
         const orderId =  window?.globalFun?.util?.getRandomString(28);
         fetch(apiConfig.API.databaseURL + `orders/${orderId}.json`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
         })
         .then(data => data.json())
         .then(() => {
            const existingOrderID = context?.getters?.getUserOrders || [];
            const wishlistItemID = context?.getters?.getWishlistID || [];
            existingOrderID.push(orderId);
            const newPayload = {
               orderID: existingOrderID,
               wishlistItemID: wishlistItemID,
               address: payload.address
            };
            this.dispatch('setUserDatabaseInfo', {data: newPayload, id: context?.getters?.getUserUUID});
            this.dispatch('removeCartItem');
            router.push('/account');
            context.commit('showPayment');

            // context.commit('setDatabaseInfo', {data: data, id: payload.customerID });
         });
      },
   }
};

export default checkoutStore;