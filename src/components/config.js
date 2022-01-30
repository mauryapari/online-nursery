/**
 * @file
 * Constants will be used further

/* API ENDPOINTS */
export const API = {
   baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
   signUpURL: ':signUp?key=',
   loginURL: ':signInWithPassword?key=',
   setUserData: ':update?key=',
   getUserData: ':lookup?key=',
   databaseURL: 'https://plant-nursery-53d6b-default-rtdb.firebaseio.com/',
   AUTHTOKEN: readCookie('auth-token') ? readCookie('auth-token'): '',
   userID: readCookie('user-id') ? readCookie('user-id') : '',
   WISHLISTID:  readCookie('ct-wishlist-id') ? readCookie('ct-wishlist-id'): '',
   cartID: readCookie('cart-id') ? readCookie('cart-id') : '',
};

function readCookie(name) {
   var value = "; " + document.cookie;
   var parts = value.split("; " + name + "=");
   if (parts.length == 2) {
      return parts.pop().split(";").shift();
   } else {
      return null;
   }
}
