const utilStore = {
   state: {
      isUserModalVisible: false,
      modalName: ''
   },
   getters: {
      showUserModal(state) {
         return state.isUserModalVisible;
      },
      getModalName(state) {
         return state.modalName;
      }
   },
   mutations: {
      showUserModal(state) {
         state.isUserModalVisible = !state.isUserModalVisible;
      },
      setModalName(state, payload) {
         state.modalName = payload
      }
   },
   actions: {
      showUserModal(context, payload) {
         context.commit('showUserModal');
      },
      setModalName(context, payload) {
         context.commit('setModalName', payload)
      }
   }
}

export default utilStore;