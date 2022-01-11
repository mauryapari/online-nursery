const apiConfig = require('../config');

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
      },
      getCartItemQuantity(state) {
         const totalQuantity = state.cartItems.reduce((sum, item) => { return sum + item.quantity }, 0);
         return totalQuantity;
      },
      getTotalCartPrice(state) {
         const totalPrice = state.cartItems.reduce((sum, item) => { return sum + item.totalPrice }, 0);
         return totalPrice;
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
               state.cartItems.splice(itemIndex, 1, obj);
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
         const obj = {
            itemName: data.itemName,
            itemPrice: data.itemPrice,
            quantity: data?.quantity,
            totalPrice: data.itemPrice * data.quantity,
            imgSrc: data.imgSrc || data?.item?.imgpath,
            itemId: data?.itemId
         }
         if(itemIndex >= 0) {
            const item = state.cartItems[itemIndex]
            obj.quantity+=item?.quantity
            obj.totalPrice= obj.quantity * item?.itemPrice;
            state.cartItems.splice(itemIndex, 1, obj);
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
         state.itemKeyMap.splice(itemIndex, 1);
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
         state.itemKeyMap = [];
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
         const cartID = context.getters?.getUserCartID;
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
         .then((data) => {
            if(data?.error?.errors && data?.error?.message) {
               throw data.error;
            } else {
               this.dispatch('fetchCartItems', cartID);
               const modalData = {
                  action: true,
                  data: {
                     title: 'Item Added To Cart',
                     subtitle: '',
                     type: 'info',
                     iconName: 'info'
                  }
               }
               this.dispatch('setToastModalData', modalData);
            }
         }).catch(()=> {
            const modalData = {
               action: true,
               data: {
                  title: 'Could not Add Item',
                  subtitle: '',
                  type: 'error',
                  iconName: 'error'
               }
            }
            this.dispatch('setToastModalData', modalData);
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
         const modalData = {
            action: true,
            data: {
               title: 'Item Added To Cart',
               subtitle: '',
               type: 'info',
               iconName: 'info'
            }
         }
         this.dispatch('setToastModalData', modalData);
         context.commit('addToLocalCart', itemOBj)
      },
      removeCartItem(context, id) {
         const cartID = context.getters?.getUserCartID;
         if(id) {
            const itemIndex = context.state.cartItemsID.findIndex(item => item ===  id);
            const key = context.state.itemKeyMap[itemIndex].key;
            fetch(apiConfig.API.databaseURL + `carts/${cartID}/${key}.json`, {
               method: 'DELETE'
            })
            .then(() => {
               context.commit('removeCartItem',  { isUserLoggedIn: context.getters.getUserLoggedIn, id: id });
               const modalData = {
                  action: true,
                  data: {
                     title: 'Item Removed From Cart',
                     subtitle: '',
                     type: 'info',
                     iconName: 'info'
                  }
               }
               this.dispatch('setToastModalData', modalData);
            })
         } else {
            fetch(apiConfig.API.databaseURL + `carts/${cartID}.json`, {
               method: 'DELETE'
            })
            .then(() => {
               context.commit('removeAll', { isUserLoggedIn: context.getters.getUserLoggedIn });
               const modalData = {
                  action: true,
                  data: {
                     title: 'All Items Removed From Cart',
                     subtitle: '',
                     type: 'info',
                     iconName: 'info'
                  }
               }
               this.dispatch('setToastModalData', modalData);
            })
         }
      },
      removeLocalCartItem(context, id) {
         if(id) {
            context.commit('removeCartItem', { isUserLoggedIn: context.getters.getUserLoggedIn, id: id });
            const modalData = {
               action: true,
               data: {
                  title: 'Item Removed From Cart',
                  subtitle: '',
                  type: 'info',
                  iconName: 'info'
               }
            }
            this.dispatch('setToastModalData', modalData);
            return;
         } 
         context.commit('removeAll', { isUserLoggedIn: context.getters.getUserLoggedIn });
      },
      isCartAvailable(context) {
         const isUserLoggedIn  = context?.getters?.getUserLoggedIn;
         if (apiConfig.API.cartID) {
            this.dispatch('fetchCartItems', apiConfig.API.cartID)
            return;
         }
         if(!isUserLoggedIn) {
            const data = localStorage.getItem('cartDetails');
            context.commit('sortLocalData', JSON.parse(data));
         }
      }
   }
}

export default cartStore;