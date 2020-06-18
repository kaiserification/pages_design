const searchEraser = document.querySelector('[data-toggle="search-eraser"]');

$('.has-close-btn').on('input', function(event) {
	const value = $(this).val()
	if (value.length > 0) {
		searchEraser.style.display = null
	} else {
		searchEraser.style.display = 'none'
	}
});	

$(document).on('click', function() {
	document.querySelector('#search-faq-box').style.display = 'none'
})

searchEraser.addEventListener('click', function(event) {
	event.preventDefault()
	const target = event.target.getAttribute('data-target')
	document.querySelector(target).value = ''
	document.querySelector(target).focus() 
	event.target.style.display = 'none' 
	document.querySelector('#search-faq-box').style.display = 'none'
	// console.log(target)
});

$('.search-faq-input').focus(function(event) {
	const value = $(this).val()
	displayResults(value);
})

$('.search-faq-input').on('input', function(event) {
	const value = $(this).val()
	displayResults(value);
});

function displayResults (value) {
	const searchBox = document.querySelector('#search-faq-box');

	if (value.length >= 3) {
		$.get('/api/questions', {query: value, mobile: false}).done(function(data, status) {
			if (data.questions && data.questions.length > 0) {
				searchBox.style.display = null;
				const lists = data.questions.map(question => {
					return `
						<li class="search-faq-box-item">
							<a href="${question.show_link}" class="search-faq-box-link">
								<span class="question-type">${question.question_type.name}</span>
								<span class="question-name">${question.name}</span>
								<p class="text-small text-bold">${question.description}</p>
							</a>
						</li>
					`
				});
				$('#search-faq-box').empty().append(lists)
			} else {
				searchBox.style.display = 'none';
			}
		}).fail(function(response) {
			alert('Une erreur est survenue lors de la récupération des questions')
		}).always(function() {

		})
	} else {
		searchBox.style.display = 'none';
	}
}