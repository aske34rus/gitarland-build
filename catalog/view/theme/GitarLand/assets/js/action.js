
// Action OwlCarousel
$(document).ready(function() {
  $("#home-slider").owlCarousel({
      items: 1,
      nav: true,
      navText: ["",""],
      autoplay: true
  });
  $("#review-slider").owlCarousel({
      items: 1,
      nav: true,
      navText: ["",""],
      autoplay: true
  });
  $("#review-carusel").owlCarousel({
      items: 1,
      nav: true,
      navText: ["",""],
      autoplay: true
  });
});


// Action jQuery Form Styler
$(document).ready(function() {
  $('.styler').styler({
    selectSmartPositioning: false
  });
});

// Action jquery.maskedinput.js
$(document).ready(function() {
 $("input#phone").mask("+7(999) 999-99-99").attr("placeholder", "+7(___) ___-__-__");
});

