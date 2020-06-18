let observer = new IntersectionObserver(function(observables) {
	observables.forEach(function(observable) {
		if (observable.isIntersecting) {
			// observable.target.classList.remove('not-visible')
			observable.target.classList.remove('animated slideInLeft')
			observer.unobserve(observable.target)
		}
	})
}, {
	threshold: [.5]
})


let items = document.querySelectorAll('.how-it-works')

items.forEach(function(item) {
	item.classList.add('animated slideInLeft')
	observer.observe(item)
})