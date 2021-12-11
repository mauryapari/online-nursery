
const firebaseAPI = require('../../firebaseConfig');
const apiConfig = require('../config');
const apiKey = firebaseAPI.firebaseConfig.apiKey;

const authStore = {
   state: {
      isAdmin: false,
      isUserLoggedIn: null
   },
   getters: {
      getUserLoggedIn(state) {
         return state.isUserLoggedIn;
      }
   },
   mutations: {
      setUserStatus(state, payload) {
         state.isUserLoggedIn = payload;
      }
   },
   actions: {
      signUp(context, payload) {
         fetch(apiConfig.API.baseURL + apiConfig.API.signUpURL + apiKey, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        .then(data => data.json())
        .then(data => {
           window.globalFun.util.setCookie('auth-token', data.localId, Number(data.expiresIn), '/');
           context.commit('setUserStatus', true);
           this.dispatch('setModalName', '');
        })
      },
      logIn(context, payload) {
         try {
            fetch(apiConfig.API.baseURL + apiConfig.API.loginURL + apiKey, {
               method: 'POST',
               body: JSON.stringify({
                   email: payload.email,
                   password: payload.password,
                   returnSecureToken: true
               })
           })
           .then(data => data.json())
           .then(data => {
              if(data)
              window.globalFun.util.setCookie('auth-token', data.localId, Number(data.expiresIn), '/');
              context.commit('setUserStatus', true);
              this.dispatch('setModalName', '');
           })
         } catch (error) {
            console.log(error);
         }
      },
      isUserRegistered(context) {
         if (apiConfig.API.AUTHTOKEN) {
            context.commit('setUserStatus', true);
            return;
         }
         context.commit('setUserStatus', false);
      }
   }
};

export default authStore;