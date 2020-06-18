$(window).on('load', function() {
  $('#arrows-slider').css('display', '');
});

$('#slider-toggler').click(function(event) {
  event.preventDefault()
  $('#slider-contact').toggleClass('open');
});
$(document).click(function(event) {
  if ($('#slider-contact').hasClass('open')) {
    $('#slider-contact').removeClass('open');
  }
});

$('#slider-contact').click(function(event) {
  event.stopPropagation();
});