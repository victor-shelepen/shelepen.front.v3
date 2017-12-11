$(document).ready(() => {
  $('#outer-body').css('display', 'block');
  $('#loading').css('display', 'none');
  $('#fullpage')
    .fullpage({
      verticalCentered: false,
      anchors: ['heroPage', 'aboutMePage', 'resumePage', 'servicesPage', 'contactPage'],
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: ['Home', 'About me', 'Resume', 'Services', 'Contact'],
      slidesNavPosition: 'top',
      controlArrows: true
    });

  $('#header .mobile-menu-button')
    .on('click', () => {
      $('#header .menu')
        .addClass('show');
    });

  $('#header .menu .close-button')
    .on('click', (event) => {
      console.log('CLOSED');
      $('#header .menu')
        .removeClass('show');
      event.preventDefault();
    });

  $('#header .menu .link')
    .on('click', (event) => {
      let href = $(event.target).attr('data-href');
      $('#header .menu')
        .removeClass('show');
      $.fn.fullpage.moveTo(href);
    });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46661212-1', 'auto');
ga('send', 'pageview');
