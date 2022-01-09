const utilStore = {
   state: {
      isUserModalVisible: false,
      modalName: '',
      isToastMessageModalVisible: false,
      toastModalData: {}
   },
   getters: {
      showUserModal(state) {
         return state.isUserModalVisible;
      },
      getModalName(state) {
         return state.modalName;
      },
      getIsToastModalVisible(state) {
         return state.isToastMessageModalVisible;
      },
      getToastModalData(state) {
         return state.toastModalData;
      }
   },
   mutations: {
      showUserModal(state) {
         state.isUserModalVisible = !state.isUserModalVisible;
      },
      setModalName(state, payload) {
         state.modalName = payload
      },
      setToastModal(state, payload) {
         state.isToastMessageModalVisible = payload;
      },
      setToastModalData(state, payload) {
         state.toastModalData = payload;
      }
   },
   actions: {
      showUserModal(context, payload) {
         context.commit('showUserModal');
      },
      setModalName(context, payload) {
         context.commit('setModalName', payload)
      },
      setToastModalData(context, payload) {
         context.commit('setToastModalData', payload.data)
         context.commit('setToastModal', payload.action)
      }
   }
}

export default utilStore;