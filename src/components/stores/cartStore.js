// const firebaseAPI = require('../../firebaseConfig');
const apiConfig = require('../config');
// const apiKey = firebaseAPI.firebaseConfig.apiKey;

const cartStore = {
   state: {
      cartItems: [],
      cartItemsID: [],
      cartItemsObj: [],
      itemKeyMap: []
   },
   getters: {
      getCartItems(state) {
         return state.cartItemsID.length;
      },
      getCartItemIDs(state) {
         return state.cartItemsID;
      },
      getCartData(state) {
         return state.cartItems;
      },
      getCartItemObj(state) {
         return state.cartItemsObj;
      }
   },
   mutations: {
      sortData(state, data) {
         for(let key in data) {
            const itemIndex = state.cartItemsID.findIndex(item => item === data[key].itemId);
            const hasQuanChanges = state.cartItems[itemIndex]?.quantity !== data[key]?.quantity;
            if(itemIndex < 0) {
               state.cartItemsID.push(data[key].itemId);
               let obj = {
                  itemName: data[key].itemName,
                  itemPrice: data[key].itemPrice,
                  quantity: data[key]?.quantity,
                  totalPrice: data[key].itemPrice * data[key].quantity,
                  imgSrc: data[key]?.item?.imgpath,
                  itemId: data[key]?.itemId
               }
               const pair = {
                  id: data[key].itemId,
                  key: key
               }
               state.cartItems.push(obj);
               state.cartItemsObj.push(data[key]?.item);
               state.itemKeyMap.push(pair);
            }
            if(hasQuanChanges) {
               let obj = {
                  itemName: data[key].itemName,
                  itemPrice: data[key].itemPrice,
                  quantity: data[key]?.quantity,
                  totalPrice: data[key].itemPrice * data[key].quantity,
                  imgSrc: data[key]?.item?.imgpath,
                  itemId: data[key]?.itemId
               }
               state.cartItems[itemIndex] = obj;
            }
         }
      },
      sortLocalData(state, data) {
         state.cartItems = data.cartItems;
         state.cartItemsID = data.cartItemsID;
         state.cartItemsObj = data.cartItemsObj;
      },
      addToLocalCart(state, data) {
         const itemIndex = state.cartItemsID.findIndex(item => item === data.itemId);
         const hasQuanChanges = state.cartItems[itemIndex]?.quantity !== data?.quantity;
         const obj = {
            itemName: data.itemName,
            itemPrice: data.itemPrice,
            quantity: data?.quantity,
            totalPrice: data.itemPrice * data.quantity,
            imgSrc: data.imgSrc || data?.item?.imgpath,
            itemId: data?.itemId
         }
         if(itemIndex >= 0 || hasQuanChanges) {
            const item = state.cartItems[itemIndex]
            obj.quantity+=item.quantity
            obj.totalPrice= obj.quantity * item.itemPrice
            state.cartItems[itemIndex] = obj;
         } else if (itemIndex <0) {
            state.cartItemsID.push(data.itemId);  
            state.cartItems.push(obj);
            state.cartItemsObj.push(data?.item);
         }
         const localStorageData = {
            cartItemsID : state.cartItemsID,
            cartItems: state.cartItems,
            cartItemsObj: state.cartItemsObj
         };
         localStorage.setItem('cartDetails', JSON.stringify(localStorageData));
      },
      removeCartItem(state, data) {
         const itemIndex = state.cartItemsID.findIndex(item => item === data.id);
         state.cartItemsID.splice(itemIndex, 1);
         state.cartItems.splice(itemIndex, 1);
         state.cartItemsObj.splice(itemIndex, 1);
         const isLoggedIn = data.isUserLoggedIn;
         if(!isLoggedIn) {
            const localStorageData = {
               cartItemsID : state.cartItemsID,
               cartItems: state.cartItems,
               cartItemsObj: state.cartItemsObj
            };
            localStorage.setItem('cartDetails', JSON.stringify(localStorageData));
         }
      },
      removeAll(state, data) {
         state.cartItemsID = [];
         state.cartItems = [];
         state.cartItemsObj = [];
         const isLoggedIn = data.isUserLoggedIn;
         if(!isLoggedIn) {
            const localStorageData = {
               cartItemsID : state.cartItemsID,
               cartItems: state.cartItems,
               cartItemsObj: state.cartItemsObj
            };
            localStorage.setItem('cartDetails', JSON.stringify(localStorageData));
         }
      }
   },
   actions: {
      addToCart(context, data) {
         const itemIndex = context.state.cartItemsID.findIndex(item => item ===  data?.payload?.variantId);
         const cartID = apiConfig.API.cartID;
         let method = 'POST';
         let url = apiConfig.API.databaseURL + `carts/${cartID}.json`;
         const itemOBj = {
            item: data?.payload,
            itemId: data?.payload?.variantId,
            itemPrice: data?.payload?.offerprice[0],
            quantity: data?.quantity || 1,
            itemName: data?.payload?.itemname
         };
         if(itemIndex >= 0) {
            method = 'PUT';
            const item = context.state.cartItems[itemIndex]
            const itemKey = context.state.itemKeyMap[itemIndex].key;
            itemOBj.quantity+=item.quantity
            url = apiConfig.API.databaseURL + `carts/${cartID}/${itemKey}.json`;
         }
         fetch(url, {
            method: method,
            body: JSON.stringify(itemOBj)
         })
         .then(data => data.json())
         .then(() => {
            this.dispatch('fetchCartItems', cartID);
         })
      },
      fetchCartItems(context, cartID) {
         fetch(apiConfig.API.databaseURL + `carts/${cartID}.json`)
         .then(data => data.json())
         .then(data => {
            context.commit('sortData', data);
         });
      },
      addToLocalCart(context, data) {
         const itemOBj = {
            item: data?.payload,
            itemId: data?.payload?.variantId,
            itemPrice: data?.payload?.offerprice[0],
            quantity: data?.quantity || 1,
            itemName: data?.payload?.itemname
         };
         context.commit('addToLocalCart', itemOBj)
      },
      removeCartItem(context, id) {
         const cartID = apiConfig.API.cartID;
         if(id) {
            const itemIndex = context.state.cartItemsID.findIndex(item => item ===  id);
            const key = context.state.itemKeyMap[itemIndex].key;
            fetch(apiConfig.API.databaseURL + `carts/${cartID}/${key}.json`, {
               method: 'DELETE'
            })
            .then(() => {
               context.commit('removeCartItem',  { isUserLoggedIn: context.getters.getUserLoggedIn, id: id });
            })
         } else {
            fetch(apiConfig.API.databaseURL + `carts/${cartID}.json`, {
               method: 'DELETE'
            })
            .then(() => {
               context.commit('removeAll', { isUserLoggedIn: context.getters.getUserLoggedIn });
            })
         }
      },
      removeLocalCartItem(context, id) {
         if(id) {
            context.commit('removeCartItem', { isUserLoggedIn: context.getters.getUserLoggedIn, id: id });
            return;
         } 
         context.commit('removeAll', { isUserLoggedIn: context.getters.getUserLoggedIn });
      },
      getCartInfo(context, id) {

      },
      setCartInfo(context) {

      },
      isCartAvailable(context) {
         if (apiConfig.API.cartID) {
            this.dispatch('fetchCartItems', apiConfig.API.cartID)
            return;
         }
         const data = localStorage.getItem('cartDetails');
         // context.commit('addToLocalCart');
         context.commit('sortLocalData', JSON.parse(data));
      }
   }
}

export default cartStore;