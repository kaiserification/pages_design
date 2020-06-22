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

$('.add-to-cart-btn').on('click', function() {
	$(this).removeClass("show");
	showLoader();
	setTimeout(hideLoader(), 1000);
	console.log($(this).closest(".product-item"));
	$(this).closest(".product-item").prev().addClass("show");
	// $(".confirmable-overlay").addClass("show");
});

function showLoader() {
	document.querySelector('#loader').style.display = null
}

function hideLoader() {
	document.querySelector('#loader').style.display = 'none'
}