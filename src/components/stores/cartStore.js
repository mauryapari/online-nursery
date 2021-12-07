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
            totalPrice: data.itemPrice * data.quantity,
            quantity: data?.quantity,
            imgSrc: data?.item?.imgpath,
            itemId: data?.itemId
         }
         if(itemIndex < 0) {
            state.cartItemsID.push(data.itemId);  
            state.cartItems.push(obj);
            state.cartItemsObj.push(data?.item);
            return;
         }
         // state.cartItemsObj[itemIndex] = data/
         state.cartItems[itemIndex] = obj;
      }
   },
   actions: {
      addToCart(context, data) {
         console.log(data);
         const itemOBj = {
            item: data?.payload,
            itemId: data?.payload?.variantId,
            itemPrice: data?.payload?.offerprice[0],
            quantity: data?.quantity || 1,
            itemName: data?.payload?.itemname
         };
         context.commit('addToCart', itemOBj);
      }
   }
}

export default cartStore;