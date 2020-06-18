$('.accordeon-toggler').click(function(event) {
	event.preventDefault();
	const target = $(this).data('target');
	$(target).toggleClass('active');
	$(this).toggleClass('active');
	if ($(this).hasClass('active')) {
		$(this).find('.accordeon-icon').css('transform', 'rotate(90deg)');
	} else {
		$(this).find('.accordeon-icon').css('transform', 'rotate(0deg)');
	}
});