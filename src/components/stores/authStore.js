
const firebaseAPI = require('../../firebaseConfig');
const apiConfig = require('../config');
const apiKey = firebaseAPI.firebaseConfig.apiKey;

const authStore = {
   state: {
      isAdmin: false,
      isUserLoggedIn: null,
      userDetails: {},
      UUID: ''
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
      },
      getUserUUID(state) {
         return state.UUID;
      }
   },
   mutations: {
      setUserStatus(state, payload) {
         state.isUserLoggedIn = payload;
      },
      setUserInfo(state, payload) {
         const userInfo = (payload.users && payload.users.length) ? payload.users[0] : '';
         const UUID = userInfo.localId;
         state.UUID = UUID;
         state.userDetails = payload
      },
      setDatabaseInfo(state, payload) {
         if(payload?.data?.cartID) {
            state.userDetails.userDatabaseInfo = payload?.data;
         } else {
            state.userDetails.userDatabaseInfo = payload?.data[payload.id];
         }
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
           this.dispatch('removeLocalCartItem');
           this.dispatch('setUserInfo', data);
           this.dispatch('addUserToDatabase', data.localId);
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
              this.dispatch('removeLocalCartItem');
              this.dispatch('getUserInfo', data.idToken);
              this.dispatch('getCartDetailsFromUser', data.localId);
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
        .then(() => {
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
         this.dispatch('isCartAvailable');
      },
      addUserToDatabase(context, id) {
         const generatedCartID = window?.globalFun?.util?.getRandomString(28);
         const data = {
            orderIds: [],
            address: {},
            wishlistItemIds: [],
            cartID: generatedCartID,
         };
         fetch(apiConfig.API.databaseURL + `users/${id}.json`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         })
         .then(data => data.json())
         .then(data => {
            window.globalFun.util.setCookie('cart-id', generatedCartID, 3600, '/');
            context.commit('setDatabaseInfo', {data: data, id: id });
         });
      },
      // getUser(context, id) {
      //    fetch(apiConfig.API.databaseURL + `users.json?orderBy="wishlistItemIds"&print=pretty`)
      //    .then(data => data.json())
      //    .then(data => {
      //       console.log(data);
      //    });
      // },
      getCartDetailsFromUser(context, id) {
         fetch(apiConfig.API.databaseURL + `users.json?orderBy="$key"&equalTo="${id}"&print=pretty`)
         .then(data => data.json())
         .then(data => {
            let generatedCartID = '';
            for(let key in data) {
               generatedCartID = data[key].cartID;
            }
            console.log(generatedCartID);
            window.globalFun.util.setCookie('cart-id', generatedCartID, 3600, '/');
            context.commit('setDatabaseInfo', {data: data, id: id });
            this.dispatch('fetchCartItems', generatedCartID);
         });
      }
   }
};

export default authStore;