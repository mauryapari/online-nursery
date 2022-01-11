const apiConfig = require('../config');

const userAccountStore = {
   state: {
      usersOrderData: []
   },
   getters: {
      getUserOrderData(state) {
         return state.usersOrderData;
      }
   },
   mutations: {
      setUserOrders(state, data) {
         state.usersOrderData = data
      }
   },
   actions: {
      async fetchUserOrders(context, payload) {
         var promises = [];
         if(payload && payload.length) {
            payload.forEach(item => {
               console.log(item);
               promises.push(fetch(apiConfig.API.databaseURL + `orders/${item}.json`).then(resp => resp.json()))
            })
            const data = await Promise.all(promises);
            context.commit('setUserOrders', data);
         } else {
            context.commit('setUserOrders', [])
         }
      }
   }
}

export default userAccountStore;