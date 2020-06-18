function activeTab (link) {
	const target = link.attr('href')
	if(! link.parent().hasClass('active')) {
		link.parent().parent().find('.tab').removeClass('active')
		link.parent().addClass('active')
		$(target).parent().find('.tab-content').removeClass('active')
		$(target).addClass('active')
	}	
}

$('.tabs .tab-link').click(function(event) {
	activeTab($(this))
})

activeTab($(`a[href="${window.location.hash}"]`))

$(window).on('hashchange', function(event) {
	activeTab($(`a[href="${window.location.hash}"]`));
});