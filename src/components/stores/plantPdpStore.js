const plantPdpStore = {
   state: {
      plantDetail: {}
   },
   getters: {
      getPlantDetail(state) {
         return state.plantDetail;
      }
   },
   mutations: {
      setPlantDetail(state, data) {
         state.plantDetail = data;
      }
   },
   actions: {
      setPlantDetail(context, data) {
         context.commit('setPlantDetail', data)
      }
   },
}

export default plantPdpStore;