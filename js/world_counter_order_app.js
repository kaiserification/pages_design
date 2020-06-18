const closeBtn               = document.getElementById('form-close-button')
closeBtn.addEventListener('click', function(event) {
	event.preventDefault()
	Swal.fire({
		title: 'Voulez vous quitter ?',
		showCancelButton: true, 
		confirmButtonColor: '#ccc',
		confirmButtonText: 'OUI',
		cancelButtonText: 'NON',
		cancelButtonColor: '#ff6b81',
		focusConfirm: false,
	}).then(result => {
		if (result.value) {
			location.href = '/catalogue-de-produits'
		} 
	})
})