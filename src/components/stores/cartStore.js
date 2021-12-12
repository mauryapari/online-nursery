const cartStore = {
   state: {
      cartItems: [],
      cartItemsID: [],
      cartItemsObj: []
   },
   getters: {
      getCartItems(state) {
         return state.cartItemsID.length;
      },
      getCartData(state) {
         return state.cartItems;
      },
      getCartItemObj(state) {
         return state.cartItemsObj;
      }
   },
   mutations: {
      addToCart(state, data) {
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
            obj.quantity+=item.quantity
            obj.totalPrice= obj.quantity * item.itemPrice
            state.cartItems[itemIndex] = obj;
            return;
         }
         state.cartItemsID.push(data.itemId);  
         state.cartItems.push(obj);
         state.cartItemsObj.push(data?.item);
      },
      removeCartItem(state, id) {
         const itemIndex = state.cartItemsID.findIndex(item => item === id);
         console.log(id, itemIndex);
         state.cartItemsID.splice(itemIndex, 1);
         state.cartItems.splice(itemIndex, 1);
         state.cartItemsObj.splice(itemIndex, 1);
      },
      removeAll(state) {
         state.cartItemsID = [];
         state.cartItems = [];
         state.cartItemsObj = [];
      }
   },
   actions: {
      addToCart(context, data) {
         const itemOBj = {
            item: data?.payload,
            itemId: data?.payload?.variantId,
            itemPrice: data?.payload?.offerprice[0],
            quantity: data?.quantity || 1,
            itemName: data?.payload?.itemname
         };
         context.commit('addToCart', itemOBj);
      },
      changeQuantity(context, data) {
         console.log(data);
         context.commit('addToCart', data);
      },
      removeCartItem(context, id) {
         if(id) {
            context.commit('removeCartItem',id);
            return;
         } 
         context.commit('removeAll');
      }
   }
}

export default cartStore;