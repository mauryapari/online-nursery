const apiConfig = require('../config');

const userAccountStore = {
   state: {
      usersOrderData: [],
      currentData: {}
   },
   getters: {
      getUserOrderData(state) {
         return state.usersOrderData;
      },
      getSelectedOrderData(state) {
         return state.currentData;
      }
   },
   mutations: {
      setUserOrders(state, data) {
         state.usersOrderData = data
      },
      setCurrentOrderData(state, data) {
         state.currentData = data
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
            let newData = data.map((item, index)=>({...item, orderID: payload[index]}));
            console.log(newData);
            context.commit('setUserOrders', newData);
         } else {
            context.commit('setUserOrders', [])
         }
      },
      setCurrentOrderData(context, payload) {
         fetch(apiConfig.API.databaseURL + `orders.json?orderBy="$key"&equalTo="${payload}"`)
         .then(data => data.json())
         .then(data => {
            const orderID = Object.keys(data);
            let newData = data[orderID[0]];
            newData.orderID = orderID[0];
            context.commit('setCurrentOrderData', newData);
         })
      }
   }
}

export default userAccountStore;