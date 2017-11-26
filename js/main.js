//import $ from  'jquery';

//import './test';
// ss

$(document).ready(() => {
  $('#fullpage').fullpage({
    verticalCentered: false,
    anchors: ['heroPage', 'aboutMePage', 'resumePage', 'servicesPage', 'contactPage'],
    sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About me', 'Resume', 'Services', 'Contact']
  });
});
