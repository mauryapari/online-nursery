
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
         }
      };

      return {
         util,
         plantData
      };
   }
   window.globalFun = globalFunInit();
})();
