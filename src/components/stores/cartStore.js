const cartStore = {
   state: {
      cartItems: [],
      cartItemsID: [],
      cartItemsObj: []
   },
   getters: {
      getCartItems(state) {
         return state.cartItems;
      }
   },
   mutations: {
      addToCart(state, data) {
         const itemIndex = state.cartItemsID.findIndex(item => item === data.itemId);
         const obj = {
            itemName: data.itemName,
            itemPrice: data.itemPrice,
            totalAmount: data.itemPrice * data.quantity
         }
         if(itemIndex < 0) {
            state.cartItemsID.push(data.itemId);  
            state.cartItems.push(obj);
            return;
         }
         state.cartItems[itemIndex] = obj;
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
      }
   }
}

export default cartStore;