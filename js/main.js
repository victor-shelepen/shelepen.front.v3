//import $ from  'jquery';

//import './test';
// ss

$(document).ready(() => {
  $('#outer-body').css('display', 'block');
  $('#loading').css('display', 'none');
  $('#fullpage')
    .fullpage({
      verticalCentered: false,
      anchors: ['heroPage', 'aboutMePage', 'resumePage', 'servicesPage', 'contactPage'],
      //sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
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
