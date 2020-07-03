$(document).ready(function () {

	var alterClass = function() {
	var ww = document.body.clientWidth;
		if (ww < 767) {
			$('.item').removeClass('desktop-background');
		} else if (ww >= 768) {
			$('.item').addClass('desktop-background');
		};
	};
	$(window).resize(function(){
		alterClass();
	});
		//Fire it when the page first loads:
		alterClass();
});