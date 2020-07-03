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


$('.Collapsible__Button').on('click', function() {
    if ($(this).attr( 'aria-expanded') === 'true') {
      $(".Collapsible__Inner").each(function () {
        $(this).removeClass("expand");
      });
      $(".Collapsible__Button").attr("aria-expanded", 'false');
      $(this).attr( 'aria-expanded', 'false');
      $(this).closest(".Collapsible").find(".Collapsible__Inner").removeClass("expand");
  } else {
      $(".Collapsible__Inner").each(function () {
        $(this).removeClass("expand");
      });
      $(".Collapsible__Button").attr("aria-expanded", 'false');
      $(this).attr( 'aria-expanded', 'true');
      $(this).closest(".Collapsible").find(".Collapsible__Inner").addClass("expand");
  }
});

$('.Collapsible__Button_sub_Inner').on('click', function() {
  if ($(this).attr( 'aria-expanded') === 'true') {
    $(".Collapsible__Inner_sub_Inner").each(function () {
      $(this).removeClass("expand");
    });
    $(".Collapsible__Button_sub_Inner").attr("aria-expanded", 'false');
    $(this).attr( 'aria-expanded', 'false');
    $(this).closest(".Collapsible").find(".Collapsible__Inner_sub_Inner").removeClass("expand");
} else {
    $(".Collapsible__Inner_sub_Inner").each(function () {
      $(this).removeClass("expand");
    });
    $(".Collapsible__Button_sub_Inner").attr("aria-expanded", 'false');
    $(this).attr( 'aria-expanded', 'true');
    $(this).closest(".Collapsible").find(".Collapsible__Inner_sub_Inner").addClass("expand");
}
});