<template>
  
<div class="footer">
  <div class="footer__inner container">
    <div class="footer__items">
      <img src="../../resources/img/logo.webp" alt="logo-footer" class="footer__logo"/>
      <p class="footer__description">Find a wide range of plants, pebble stones and best indoor outdoor fountains supplies.</p>
    </div>

    <div class="footer__items">
      <h3 class="footer__header">Quick Links</h3>
      <div class="footer__underline"></div>
        <ul>
          <a href="#"><li>Home</li></a>
          <a href="#"><li>Privacy Policy</li></a>
          <a href="#"><li>Contact</li></a>
          <a href="#"><li>About</li></a>
        </ul>
    </div>

    <div class="footer__items">
      <h3 class="footer__header">Useful Links</h3>
      <div class="footer__underline"></div> 
        <ul>
          <a href="#"><li>Gallery</li></a>
          <a href="#"><li>Testimonials</li></a>
          <a href="#"><li>Videos</li></a>
          <a href="#"><li>Services</li></a>
        </ul>
    </div>

    <div class="footer__items">
      <h3 class="footer__header">Contact us</h3>
      <div class="footer__underline"></div>
        <ul>
          <li><i class="icon icon-marker" aria-hidden="true"></i>Malad West, Mumbai, Maharashtra, 400064</li>
          <li><a href="tel:+91-8888888888"><i class="icon icon-phone" aria-hidden="true"></i>+91-8888888888</a></li>
          <li><a href="mailto:contact@us.com"><i class="icon icon-envelope" aria-hidden="true"></i>contact@us.com</a></li>
        </ul> 
    </div>
  </div>
  
  <div class="footer__bottom">
    Copyright &copy; Plant Hub 2020.
      <div class="footer__social-media">
         <a href="#"><i class="icon icon-instagram"></i></a>
         <a href="#"><i class="icon icon-facebook2"></i></a>
         <a href="#"><i class="icon icon-twitter"></i></a>
      </div> 
  </div>
</div>
</template>

<script>
export default {
   
}
</script>

<style lang="scss" scoped>
.footer {
	width: 100%;
	display: block;
   
   @include element(inner) {
      padding: 80px 10px 30px;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      justify-content: center;
   }

   @include element(header) {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
   }

   @include element(items) {
      width: 25%;
      padding: 10px 20px;
      box-sizing: border-box;
   }

   @include element(logo) {
      max-width: 150px;
      max-height: 95px;
   }

   @include element(description) {
      font-size: 16px;
      line-height: 25px;
      margin-top: 15px;
   }

   @include element (underline) {
      height: 3px;
      width: 60px;
      background: $brand-green;
      color: $brand-green;
      background-color: $brand-green;
      border: 0px;
   }

   ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      font-size: 16px;
      letter-spacing: 0.5px;	
   }

   ul a {
      text-decoration: none;
      outline: none;
      transition: 0.3s;
      line-height: 24px;
   }

   ul a:hover {
      color: $brand-green;
   }

   ul li {
      display: flex;
      margin: 10px 0;
      height: 25px;
   }

   li i {
      margin-right: 20px;
   }

   @include element(social-media) {
      text-align: center;
      font-size: 20px;
      display: inline-block;

      a {
         text-decoration: none;
      }
      
      i {
         height: 25px;
         width: 25px;
         margin: 20px 10px;
         padding: 4px;
         transition: 0.5s;
         &:hover {
            transform: scale(1.5);
         }
      }
   }

   @include element(bottom) {
      padding: 10px;
      font-size: 18px;
      text-align: center;
   }

   /* for tablet mode view */

   @include sm {
      @include element(logo) {
         max-width: 250px;
         max-height: 95px;
      }
   }
}

</style>