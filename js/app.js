//import $ from 'jquery';

window._moveTo = (anchor) => {
  $('.button-collapse').sideNav('hide');
  $('html, body').stop().animate({
    scrollTop: $(anchor).offset().top - 64
  }, 400);
};

$(document).ready(() => {
  $('.app-loading').css('display', 'none');
  $('.button-collapse').sideNav();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.collapsible').collapsible();
  $('#nav-mobile a, #slide-out .menu-items a').click((e) => {
    const anchor = $(e.target).attr('href');
    if (anchor[0] != '#') {
      return;
    }
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $(anchor).offset().top - 64
    }, 400, () => {
      history.pushState(null, null, anchor);
    });
  });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46661212-1', 'auto');
ga('send', 'pageview');
