/**
 * @file
 * Constants will be used further

/* API ENDPOINTS */
export const API = {
   baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
   signUpURL: ':signUp?key=',
   loginURL: ':signInWithPassword?key=',
   AUTHTOKEN: readCookie('auth-token'),
   WISHLISTID:  readCookie('ct-wishlist-id') ? readCookie('ct-wishlist-id'): '',
   cartID_Public: readCookie('ct_cart_id_public'),
   cartVariant_Public: readCookie('ct_cart_version_public'),
   cartID_Private: readCookie('ct_cart_id_private'),
   cartVariant_Private: readCookie('ct_cart_version_private'),
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
