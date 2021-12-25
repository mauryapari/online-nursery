
const firebaseAPI = require('../../firebaseConfig');
const apiConfig = require('../config');
const apiKey = firebaseAPI.firebaseConfig.apiKey;

const authStore = {
   state: {
      isAdmin: false,
      isUserLoggedIn: null,
      userDetails: {}
   },
   getters: {
      getUserLoggedIn(state) {
         return state.isUserLoggedIn;
      },
      getUserDetails(state) {
         return state.userDetails;
      },
      getUserName(state) {
         return state.userDetails?.users?.displayName;
      }
   },
   mutations: {
      setUserStatus(state, payload) {
         console.log(payload);
         state.isUserLoggedIn = payload;
      },
      setUserInfo(state, payload) {
         state.userDetails = payload
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
           window.globalFun.util.setCookie('user-id', data.idToken, Number(data.expiresIn), '/');
           data['name'] = payload.name;
           context.commit('setUserStatus', true);
           this.dispatch('setUserInfo', data);
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
              window.globalFun.util.setCookie('auth-token', data.localId, Number(data.expiresIn), '/');
              window.globalFun.util.setCookie('user-id', data.idToken, Number(data.expiresIn), '/');
              context.commit('setUserStatus', true);
              this.dispatch('getUserInfo', data.idToken)
              this.dispatch('setModalName', '');
           })
         } catch (error) {
            console.log(error);
         }
      },
      isUserRegistered(context) {
         if (apiConfig.API.AUTHTOKEN) {
            context.commit('setUserStatus', true);
            this.dispatch('getUserInfo', apiConfig.API.userID)
            return;
         }
         context.commit('setUserStatus', false);
      },
      logoutUser(context) {
         context.commit('setUserStatus', false);
      },
      setUserInfo(context, payload) {
         fetch(apiConfig.API.baseURL + apiConfig.API.setUserData + apiKey, {
            method: 'POST',
            body: JSON.stringify({
               idToken: payload.idToken,
               displayName: payload.name,
               photoUrl:'',
               returnSecureToken: true,
            })
        })
        .then(data => data.json())
        .then(data => {
         this.dispatch('getUserInfo', payload.idToken);
      })
      }, 
      getUserInfo(context, id) {
         fetch(apiConfig.API.baseURL + apiConfig.API.getUserData + apiKey, {
            method: 'POST',
            body: JSON.stringify({
               idToken: id
            })
        })
        .then(data => data.json())
        .then(data => {
         data['idToken'] = id;
         context.commit('setUserInfo', data);
        })
      },
      removeUserInfo(context) {
         context.commit('setUserInfo', {});
      } 
   }
};

export default authStore;