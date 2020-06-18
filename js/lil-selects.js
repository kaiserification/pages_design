$('.lil-select-toggler').click(function(event) {
  event.preventDefault();
  $(this).find('.fa').toggleClass('rotateY');
  $(this).siblings('.lil-select-content').toggleClass('show');
});

$(document).click(function() {
  closeLilSelect()
});

$('.lil-select').click(function(event) {
  event.stopPropagation();
})

$(window).on('keydown', function(event) {
  if (event.key == 'Escape') {
    closeLilSelect()
  }
});

function closeLilSelect() {
  $('.lil-select-content').removeClass('show');
}