$('[data-toggle="modal-close"]').click(function(event) {
	event.preventDefault()
	const target = $(this).data('target')
	$(target).addClass('close')
})



$('[data-toggle="modal"]').click(function(event) {
	event.preventDefault()
	const target = $(this).data('target')
	$(target).removeClass('close')
})

$('.modal__wrapper').click(function(event) {
	if (event.target.classList.contains('modal__wrapper')) {
		$(this).addClass('close')
	}
})