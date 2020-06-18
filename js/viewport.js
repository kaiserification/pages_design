const winWidth = window.innerWidth

 if (winWidth < 850) {
	const target = 'mobile' + window.location.pathname
	if (window.location.href.includes('mobile') == false) {
		window.location.href = '//' + window.location.host + '/' + target
	}
}