//import $ from  'jquery';

//import './test';

$(document).ready(() => {
  $('#fullpage').fullpage({
    verticalCentered: false,
    anchors: ['homePage', 'secondPage', 'thirdPage', 'contactPage'],
    sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['First page', 'Second page', 'Third and last page']
  });
});
