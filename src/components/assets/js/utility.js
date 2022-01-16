
(() => {
   const globalFunInit = () => {
      if(window.globalFun) {
         return window.globalFun;
      }

      const plantData = require('../../../resources/json/smallPlantData.json');
      const util = {
         getPlantDetail(id) {
            const index = plantData.findIndex(item => item.variantId.toString() === id);
            return plantData[index];
         },

         getRandomNum(num) {
            return Math.floor(Math.random() * (num + 1));
         },

         emailValidation(val) {
            const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(val);
         },
         
         telValidation(value) {
            const numReg = /^[1-9]{1}[0-9]{9}$/;
            return numReg.test(value);
         },

         setCookie(cname, cvalue, exdays, path) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
        },
        
        getRandomString(length) {
         var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         var result = '';
         for ( var i = 0; i < length; i++ ) {
             result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
         }
         return result;
     }
        
      };

      return {
         util,
         plantData
      };
   }
   window.globalFun = globalFunInit();
})();
