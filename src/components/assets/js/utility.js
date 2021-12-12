
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
         
         telValidation(val) {
            const numReg = /^[0]?[789]\d{9}$/;
            return numReg.test(value);
         },

         setCookie(cname, cvalue, exdays, path) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
        }
        
      };

      return {
         util,
         plantData
      };
   }
   window.globalFun = globalFunInit();
})();
