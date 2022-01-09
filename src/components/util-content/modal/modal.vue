<template>
   <div class="modal">
      <div class="modal__wrapper">
         <span class="modal__close-btn" @click="closeModal">X</span>
         <div class="modal__container">
            <div class="modal__header">
               <slot name="header"></slot>
            </div>
            <div class="modal__body">
               <slot name="body"></slot>
            </div>
            <div class="modal__footer">
               <slot name="footer"></slot>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   methods: {
      closeModal() {
         this.$store.dispatch('setModalName','');
         this.$emit('close');
      }
   }   
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;


  @include element(wrapper) {
      position: relative;
      vertical-align: middle; 
      height: 100%; 
  }
  @include element(wrapper) {
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
  }

  @include element(close-btn) {
     position: absolute;
     right: 10px;
     top: 10px;
     &:hover{
        cursor: pointer;
     }
  }

  @include sm {
   display: flex;
   align-items: center;
   align-content: center;
   padding: 20px;

      @include element(wrapper) {
         // width: 300px;
         height: auto;
         box-shadow: 0 2px 10px rgb(0 0 0 / 25%);
         border-radius: 10px;
      }
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

</style>