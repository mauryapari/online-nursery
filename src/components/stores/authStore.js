
const firebaseAPI = require('../../firebaseConfig');
const apiConfig = require('../config');
const apiKey = firebaseAPI.firebaseConfig.apiKey;

const authStore = {
   state: {
      isAdmin: false,
      isUserLoggedIn: null,
      userDetails: {},
      userDatabaseInfo:{},
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
         return state.userDetails?.users?.length && state.userDetails?.users[0]?.displayName;
      },
      getUserUUID(state) {
         return state.UUID;
      },
      getUserCartID(state) {
         return state?.userDatabaseInfo?.cartID;
      },
      getUserOrders(state) {
         return state?.userDatabaseInfo?.orderID;
      },
      getUserAddress(state) {
         return state?.userDatabaseInfo?.address || null;
      },
      getWishlistID(state) {
         return state?.userDatabaseInfo?.wishlistItemID;
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
         return true;
      },
      setDatabaseInfo(state, payload) {
         if(payload?.data?.cartID) {
            state.userDatabaseInfo = payload?.data;
         } else {
            const data = payload.data? payload.data[payload.id] : {};
            state.userDatabaseInfo = data;
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
           if(data?.error?.errors && data?.error?.message) {
              throw data.error;
           } else {
              window.globalFun.util.setCookie('auth-token', data.localId, Number(data.expiresIn), '/');
              window.globalFun.util.setCookie('user-id', data.idToken, Number(data.expiresIn), '/');
              data['name'] = payload.name;
              const newPayload = {
                 orderID: [],
                 cartID: '',
                 wishlistItemID:[],
                 address: {}
              }
              context.commit('setUserStatus', true);
              this.dispatch('removeLocalCartItem');
              this.dispatch('setUserInfo', data);
              this.dispatch('setUserDatabaseInfo', { data: newPayload, id: data.localId });
              this.dispatch('setModalName', '');
              const modalData = {
                  action: true,
                  data: {
                     title: 'User Signed In',
                     subtitle: '',
                     type: 'success',
                     iconName: 'check'
                  }
               }
               this.dispatch('setToastModalData', modalData);
           }
        }).catch(res => {
         const modalData = {
            action: true,
            data: {
               title: 'Something Went Wrong',
               subtitle: res?.message,
               type: 'error',
               iconName: 'warning'
            }
         }
         this.dispatch('setToastModalData', modalData);
        })
      },
      logIn(context, payload) {
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
            if(data?.error?.errors && data?.error?.message) {
               throw data.error;
            } else {
               window.globalFun.util.setCookie('auth-token', data.localId, Number(data.expiresIn), '/');
               window.globalFun.util.setCookie('user-id', data.idToken, Number(data.expiresIn), '/');
               context.commit('setUserStatus', true);
               this.dispatch('removeLocalCartItem');
               this.dispatch('getUserInfo', data.idToken);
               this.dispatch('setModalName', '');
               const modalData = {
                  action: true,
                  data: {
                     title: 'User Logged In',
                     subtitle: '',
                     type: 'success',
                     iconName: 'check'
                  }
               }
               this.dispatch('setToastModalData', modalData);
            }
         }).catch(res => {
            const modalData = {
               action: true,
               data: {
                  title: 'Something Went Wrong',
                  subtitle: res?.message,
                  type: 'error',
                  iconName: 'warning'
               }
            }
            this.dispatch('setToastModalData', modalData);
         })
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
            this.dispatch('getCartDetailsFromUser', data.users[0].localId);
        })
      },
      removeUserInfo(context) {
         context.commit('setUserInfo', {});
         context.commit('setDatabaseInfo', {});
         this.dispatch('isCartAvailable');
      },
      setUserDatabaseInfo(context, payload) {
         const generatedCartID = window?.globalFun?.util?.getRandomString(28);
         const userDetails = {
            orderID: payload.data.orderID,
            wishlistItemID: payload.data.wishlistItemID,
            address: payload.data.address,
            cartID: generatedCartID,
         };
         fetch(apiConfig.API.databaseURL + `users/${payload.id}.json`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
         })
         .then(data => data.json())
         .then(data => {
            window.globalFun.util.setCookie('cart-id', generatedCartID, 3600, '/');
            context.commit('setDatabaseInfo', {data: data, id: payload.id });
         });
      },
      getCartDetailsFromUser(context, id) {
         fetch(apiConfig.API.databaseURL + `users.json?orderBy="$key"&equalTo="${id}"&print=pretty`)
         .then(data => data.json())
         .then(data => {
            let generatedCartID = '';
            for(let key in data) {
               generatedCartID = data[key].cartID;
            }
            window.globalFun.util.setCookie('cart-id', generatedCartID, 3600, '/');
            context.commit('setDatabaseInfo', {data: data, id: id });
            this.dispatch('fetchCartItems', generatedCartID);
         });
      }
   }
};

export default authStore;